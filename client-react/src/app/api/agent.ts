﻿import axios, {AxiosError, AxiosResponse} from "axios";
import {Activity} from "../../models/Activity";
import {toast} from "react-toastify";
import {history} from "../../browserRouter/BrowserRouter";
import {store} from "../../stores/store";

const sleep = (delay: number) => {
  return new Promise(res => setTimeout(res, delay));
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
  }, ((error: AxiosError) => {
    const {data, status, config} = error.response!
    switch (status) {
      case 400:
        if (typeof data === 'string') {
          toast.error(data);
        }
        if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
          history.push('/not-found');
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key])
            }
          }
          throw modalStateErrors.flat();
        }
        break;
      case 401:
        toast.error('unauthorised');
        break;
      case 404:
        history.push('/not-found');
        break;
      case 500:
        store.commonStore.setServerError(data);
        history.push('/server-error');
        break;
    }
    return Promise.reject(error);
  })
);

const responseBody = <T>(res: AxiosResponse<T>) => res.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  // del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
  list: () => requests.get<Activity[]>('/activities'),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post('/activities', activity),
  edit: (activity: Activity) => requests.put(`/activities/${activity.id}`, activity),
  // delete: (id: string) => requests.del(`/activities/${id}`)
}

const agent = {
  Activities
}

export default agent;
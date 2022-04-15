import {ServerError} from "../models/serverError";
import {makeAutoObservable, reaction} from "mobx";

export class CommonStore {
  error: ServerError | null = null;
  token: string | null = localStorage.getItem('token');
  appLoaded: boolean = false;

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.token,
      token => token ? localStorage.setItem('token', token) : localStorage.removeItem('token')
    );
  }

  setServerError = (error: ServerError) => {
    this.error = error;
  }

  setToken = (token: string | null) => {
    if (token)
      this.token = token;
  }

  setAppLoaded = () => {
    this.appLoaded = true;
  }
}
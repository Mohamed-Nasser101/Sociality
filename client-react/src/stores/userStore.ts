import {User, UserFormValues} from "../models/user";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../app/api/agent";
import {store} from "./store";
import {history} from "../browserRouter/BrowserRouter";

export class UserStore {
  user: User | null = null;
  refreshTokenTimeout?: number;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      this.startRefreshToken(user);
      runInAction(() => this.user = user);
      history.push('/activities');
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  }

  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds);
      store.commonStore.setToken(user.token);
      this.startRefreshToken(user);
      runInAction(() => this.user = user);
      history.push('/activities');
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  }

  logout = () => {
    store.commonStore.setToken(null);
    localStorage.removeItem('token');
    this.user = null;
    history.push('/')
  }

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      store.commonStore.setToken(user.token);
      this.startRefreshToken(user);
      runInAction(() => this.user = user);
    } catch (error) {
      console.log(error);
    }
  }

  setImage = (image: string) => {
    if (this.user)
      this.user.image = image;
  }

  setDisplayName = (displayName: string) => {
    if (this.user)
      this.user.displayName = displayName;
  }

  refreshToken = async () => {
    this.stopRefreshToken();
    try {
      const user = await agent.Account.refreshToken();
      runInAction(() => this.user = user);
      store.commonStore.setToken(user.token);
      this.startRefreshToken(user);
    } catch (error) {
      console.log(error);
    }
  }
  private startRefreshToken = (user: User) => {
    const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeOut = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeOut)
  }
  private stopRefreshToken = () => {
    clearTimeout(this.refreshTokenTimeout);
  }
}


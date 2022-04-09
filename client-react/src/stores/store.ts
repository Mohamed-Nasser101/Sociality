import ActivityStore from "./activityStore";
import {createContext, FC, useContext} from "react";

interface Store {
  activityStore: ActivityStore;
}

export const store: Store = {
  activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
}
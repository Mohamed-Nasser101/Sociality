import {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {useStore} from "../../stores/store";

const requireAuth = (Element: ReactNode) => {
  const {userStore: {isLoggedIn}} = useStore();
  return isLoggedIn
    ? Element
    : <Navigate to='/' replace/>;
}

export default requireAuth;
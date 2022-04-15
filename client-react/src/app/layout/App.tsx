import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.min.css';
import './styles.css';
import {Routes, Route} from 'react-router-dom'
import ActivityDashboard from "../../features/activity/dashboard/ActivityDashboard";
import Home from "../../features/Home/Home";
import ActivityForm from "../../features/activity/form/ActivityForm";
import ActivityDetails from "../../features/activity/details/ActivityDetails";
import Body from "./Body";
import {ToastContainer} from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import {useStore} from "../../stores/store";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import Loading from "./Loading";
import ModalContainer from "../common/modals/ModalContainer";

const App = () => {
  const {commonStore, userStore} = useStore();
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) {
    return <Loading content='App Loading...'/>
  }

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar/>
      <ModalContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/' element={<Body/>}>
          <Route path='/activities' element={<ActivityDashboard/>}/>
          <Route path='/activities/:id' element={<ActivityDetails/>}/>
          <Route path='/createActivity' element={<ActivityForm/>}/>
          <Route path='/manage/:id' element={<ActivityForm/>}/>
          <Route path='/server-error' element={<ServerError/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default observer(App);

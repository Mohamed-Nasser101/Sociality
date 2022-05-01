import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.min.css';
import './styles.css';
import {Routes, Route} from 'react-router-dom'
import Home from "../../features/Home/Home";
import Body from "./Body";
import {ToastContainer} from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import {useStore} from "../../stores/store";
import {observer} from "mobx-react-lite";
import {useEffect, Suspense, lazy} from "react";
import Loading from "./Loading";
import ModalContainer from "../common/modals/ModalContainer";
import requireAuth from "./RequireAuth";


const ActivityDashboard = lazy(() => import('../../features/activity/dashboard/ActivityDashboard'))
const ActivityDetails = lazy(() => import('../../features/activity/details/ActivityDetails'))
const ActivityForm = lazy(() => import('../../features/activity/form/ActivityForm'))
const Profile = lazy(() => import("../../features/profile/Profile"));
const ServerError = lazy(() => import("../../features/errors/ServerError"));

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
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/' element={<Body/>}>
            <Route path='/activities' element={requireAuth(<ActivityDashboard/>)}/>
            <Route path='/activities/:id' element={requireAuth(<ActivityDetails/>)}/>
            <Route path='/createActivity' element={requireAuth(<ActivityForm/>)}/>
            <Route path='/profiles/:username' element={requireAuth(<Profile/>)}/>
            <Route path='/manage/:id' element={requireAuth(<ActivityForm/>)}/>
            <Route path='/server-error' element={<ServerError/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default observer(App);

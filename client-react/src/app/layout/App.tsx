import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css';
import './styles.css';
import {Container} from "semantic-ui-react";
import {Routes, Route} from 'react-router-dom'
import ActivityDashboard from "../../features/activity/dashboard/ActivityDashboard";
import Home from "../../features/Home/Home";
import ActivityForm from "../../features/activity/form/ActivityForm";
import ActivityDetails from "../../features/activity/details/ActivityDetails";
import Body from "./Body";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/' element={<Body/>}>
        <Route path='/activities' element={<ActivityDashboard/>}/>
        <Route path='/activities/:id' element={<ActivityDetails/>}/>
        <Route path='/createActivity' element={<ActivityForm/>}/>
        <Route path='/manage/:id' element={<ActivityForm/>}/>
      </Route>
    </Routes>
  )
}

export default App

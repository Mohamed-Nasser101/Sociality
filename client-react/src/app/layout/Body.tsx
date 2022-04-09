import {Fragment} from "react";
import NavBar from "./NavBar";
import {Outlet} from "react-router-dom";

const Body = () => {
  return (
    <Fragment>
      <NavBar/>
      <Outlet/>
    </Fragment>
  )
}
export default Body;

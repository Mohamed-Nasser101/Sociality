import NavBar from "./NavBar";
import {Outlet} from "react-router-dom";
import {Container} from "semantic-ui-react";

const Body = () => {
  return (
    <Container style={{marginTop: '7em'}}>
      <NavBar/>
      <Outlet/>
    </Container>
  )
}
export default Body;

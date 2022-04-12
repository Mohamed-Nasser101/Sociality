import NavBar from "./NavBar";
import {Outlet} from "react-router-dom";
import {Container} from "semantic-ui-react";

const Body = () => {
  return (
    <>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <Outlet/>
      </Container>
    </>
  )
}
export default Body;

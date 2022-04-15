import {Button, Container, Header, Segment, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import IF from "../../app/common/IF";
import {useStore} from "../../stores/store";
import {observer} from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

const Home = () => {
  const {userStore, modalStore} = useStore();
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
          Reactivities
        </Header>
        <IF when={userStore.isLoggedIn}>
          <Header as='h2' inverted content='Welcome to Reactivities'/>
          <Button as={Link} to='/activities' size='huge' inverted>
            Go To Activities
          </Button>
        </IF>
        <IF when={!userStore.isLoggedIn}>
          <Button onClick={() => modalStore.openModal(<LoginForm/>)} size='huge' inverted>
            Login!
          </Button>
          <Button onClick={() => modalStore.openModal(<RegisterForm/>)} size='huge' inverted>
            Register!
          </Button>
        </IF>
      </Container>
    </Segment>
  );
}

export default observer(Home);
﻿import {Button, Container, Dropdown, Image, Menu} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
import {useStore} from "../../stores/store";

const NavBar = () => {
  const {userStore: {user, logout}} = useStore();
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' header>
          <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}/>
          Sociality
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities' name='Activities'/>
        <Menu.Item>
          <Button as={NavLink} to='/createActivity' positive content='Create Activity'/>
        </Menu.Item>
        <Menu.Item position='right'>
          <Image src={`${user?.image || '/assets/user.png'}`} avatar spaced='right'/>
          <Dropdown pointing='top left' text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to={`/profile/${user?.username}`} text='My Profile' icon='user'/>
              <Dropdown.Item onClick={logout} icon='power' text='Logout'/>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default observer(NavBar);
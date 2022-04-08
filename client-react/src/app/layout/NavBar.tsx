import {Button, Container, Menu} from "semantic-ui-react";

interface Props {
    onOpenForm: () => void;
}

const NavBar = ({onOpenForm}: Props) => {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}/>
                    Sociality
                </Menu.Item>
                <Menu.Item name='Activities'/>
                <Menu.Item>
                    <Button onClick={() => onOpenForm()} positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    );
}

export default NavBar;
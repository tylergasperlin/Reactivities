import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button, Container, Menu, Dropdown, Image } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { isLoggedIn, user } = rootStore.userStore;

    return (
        <Menu fixed='top' inverted>
            <Container>
                {/* exact makes it so that each button is only highlighted based on current route */}
                <Menu.Item header as={NavLink} to='/' exact>
                    <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to='/activities' />
                <Menu.Item>
                    <Button
                        as={NavLink}
                        to='/createActivity'
                        positive
                        content='Create Activity'
                    ></Button>
                </Menu.Item>
                {user && (
                    <Menu.Item position='right'>
                        <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
                        <Dropdown pointing='top left' text={user.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    as={Link}
                                    to={`/profile/username`}
                                    text='My profile'
                                    icon='user'
                                />
                                <Dropdown.Item text='Logout' icon='power' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                )}
            </Container>
        </Menu>
    );
};

export default observer(NavBar);

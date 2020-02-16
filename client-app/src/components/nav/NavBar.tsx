import { observer } from 'mobx-react-lite';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

import ActivityStore from '../../app/stores/activityStore';

const NavBar: React.FC = () => {
    const activityStore = React.useContext(ActivityStore);
    return (
        <Menu fixed='top' inverted>
            <Container>
                {/* exact makes it so that each button is only highlighted based on current route */}
                <Menu.Item header as={NavLink} to='/' exact>
                    <img
                        src='/assets/logo.png'
                        alt='logo'
                        style={{ marginRight: '10px' }}
                    />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to='/activities' />
                <Menu.Item>
                    <Button
                        as={NavLink}
                        to='/createActivity'
                        positive
                        content='Create Activity'
                        onClick={activityStore.openCreateForm}
                    ></Button>
                </Menu.Item>
            </Container>
        </Menu>
    );
};

export default observer(NavBar);

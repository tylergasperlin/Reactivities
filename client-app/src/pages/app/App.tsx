import './App.css';

import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import ActivityDetails from '../../components/activity-details/ActivityDetails';
import ActivityForm from '../../components/activity-form/ActivityForm';
import ActivityList from '../../components/activity-list/ActivityList';
import NavBar from '../../components/nav/NavBar';
import { HomePage } from '../HomePage';

const App: React.FC<RouteComponentProps> = ({ location }) => {
    return (
        <React.Fragment>
            <Route exact path={'/'} component={HomePage} />
            <Route
                // when we git route with forward slash and anything else return the following
                path={'/(.+)'}
                render={() => (
                    <React.Fragment>
                        <NavBar />
                        <Container style={{ marginTop: '7em' }}>
                            <Route
                                exact
                                path={'/activities'}
                                component={ActivityList}
                            />
                            <Route
                                exact
                                path={'/activities/:id'}
                                component={ActivityDetails}
                            />
                            {/* can use array to specify two paths for same component */}
                            <Route
                                exact
                                key={location.key}
                                path={['/createActivity', '/manage/:id']}
                                component={ActivityForm}
                            />
                        </Container>
                    </React.Fragment>
                )}
            />
        </React.Fragment>
    );
};

export default withRouter(observer(App));

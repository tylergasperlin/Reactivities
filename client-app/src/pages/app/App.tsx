import './App.css';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
    Route,
    RouteComponentProps,
    withRouter,
    Switch
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../components/activity-dashboard/ActivityDashboard';
import ActivityDetails from '../../components/activity-details/ActivityDetails';
import ActivityForm from '../../components/activity-form/ActivityForm';
import NavBar from '../../components/nav/NavBar';
import { HomePage } from '../HomePage';
import NotFound from '../../components/not-found/NotFound';

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
                            <Switch>
                                <Route
                                    exact
                                    path={'/activities'}
                                    component={ActivityDashboard}
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
                                <Route component={NotFound} />
                            </Switch>
                        </Container>
                    </React.Fragment>
                )}
            />
        </React.Fragment>
    );
};

export default withRouter(observer(App));

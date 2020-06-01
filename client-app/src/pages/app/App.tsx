import './App.css';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Route, RouteComponentProps, withRouter, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../components/activity-dashboard/ActivityDashboard';
import ActivityDetails from '../../components/activity-details/ActivityDetails';
import ActivityForm from '../../components/activity-form/ActivityForm';
import NavBar from '../../components/nav/NavBar';
import { HomePage } from '../HomePage';
import NotFound from '../../components/not-found/NotFound';
import { ToastContainer } from 'react-toastify';
import LoginForm from '../../components/login/LoginForm';
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../components/loading/LoadingComponent';
import ModalContainer from '../../components/modal/ModalContainer';

const App: React.FC<RouteComponentProps> = ({ location }) => {
    const rootStore = useContext(RootStoreContext);
    const {setAppLoaded, token, appLoaded } = rootStore.commonStore;
    const {getUser} = rootStore.userStore;

    React.useEffect(() => {
        if(token) {
            getUser().finally(() => setAppLoaded())
        } else {
            setAppLoaded()
        }
    }, [getUser, setAppLoaded, token])

    if(!appLoaded) return <LoadingComponent content='Loading app'/>

    return (
        <React.Fragment>
            <ModalContainer/>
            <ToastContainer position='bottom-right' />
            <Route exact path={'/'} component={HomePage} />
            <Route
                // when we git route with forward slash and anything else return the following
                path={'/(.+)'}
                render={() => (
                    <React.Fragment>
                        <NavBar />
                        <Container style={{ marginTop: '7em' }}>
                            <Switch>
                                <Route exact path={'/activities'} component={ActivityDashboard} />
                                <Route exact path={'/activities/:id'} component={ActivityDetails} />
                                {/* can use array to specify two paths for same component */}
                                <Route
                                    exact
                                    key={location.key}
                                    path={['/createActivity', '/manage/:id']}
                                    component={ActivityForm}
                                />
                                <Route path='/login' component={LoginForm} />
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

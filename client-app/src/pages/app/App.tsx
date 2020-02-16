import './App.css';

import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import ActivityStore from '../../app/stores/activityStore';
import ActivityDetails from '../../components/activity-details/ActivityDetails';
import ActivityForm from '../../components/activity-form/ActivityForm';
import { LoadingComponent } from '../../components/loading/LoadingComponent';
import NavBar from '../../components/nav/NavBar';
import { HomePage } from '../HomePage';
import ActivityList from '../../components/activity-list/ActivityList';

const App: React.FC = () => {
    const activityStore = React.useContext(ActivityStore);

    React.useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]); //need to specify dependencies in the brackers for useEffect to work

    if (activityStore.loadingInitial)
        return <LoadingComponent content='Loading activities...' />;

    return (
        <React.Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
                <Route exact path={'/'} component={HomePage} />
                <Route exact path={'/activities'} component={ActivityList} />
                <Route exact path={'/activities/:id'} component={ActivityDetails} />
                {/* can use array to specify two paths for same component */}
                <Route exact path={['/createActivity', '/manage/:id']} component={ActivityForm} />
            </Container>
        </React.Fragment>
    );
};

export default observer(App);

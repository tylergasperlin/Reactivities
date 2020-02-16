import './App.css';

import { observer } from 'mobx-react-lite';
import React from 'react';
import { Container } from 'semantic-ui-react';

import ActivityStore from '../../app/stores/activityStore';
import ActivityDashboard from '../../components/activity-dashboard/ActivityDashboard';
import { LoadingComponent } from '../../components/loading/LoadingComponent';
import NavBar from '../../components/nav/NavBar';

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
                <ActivityDashboard/>
            </Container>
        </React.Fragment>
    );
};

export default observer(App);

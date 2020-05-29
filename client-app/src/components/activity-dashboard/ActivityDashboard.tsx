import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';

import ActivityList from '../activity-list/ActivityList';
import { LoadingComponent } from '../loading/LoadingComponent';
import ActivityStore from '../../app/stores/activityStore'
import { RootStoreContext } from '../../app/stores/rootStore';

const ActivityDashboard: React.FC = () => {
    const { activityStore } = React.useContext(RootStoreContext);
    const { loadActivities, loadingInitial} = activityStore;

    React.useEffect(() => {
        loadActivities();
    }, [activityStore]); //need to specify dependencies in the brackers for useEffect to work

    if (loadingInitial)
        return <LoadingComponent content='Loading activities...' />;
        
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Activitiy filters</h2>
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDashboard);
 
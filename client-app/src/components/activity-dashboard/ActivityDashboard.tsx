import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';

import ActivityStore from '../../app/stores/activityStore';
import ActivityDetails from '../activity-details/ActivityDetails';
import ActivityForm from '../activity-form/ActivityForm';
import ActivityList from '../activity-list/ActivityList';

const ActivityDashboard: React.FC = () => {
    const activityStore = React.useContext(ActivityStore);
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
 
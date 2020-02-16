import React from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

import { IActivityDashboard } from './IActivityDashboard';
import ActivityList from '../activity-list/ActivityList';
import ActivityDetails  from '../activity-details/ActivityDetails';
import ActivityForm  from '../activity-form/ActivityForm';  
import ActivityStore from '../../app/stores/activityStore';

const ActivityDashboard: React.FC<IActivityDashboard> = ({
    deleteActivity,
    submitting,
    target
}) => {
    const activityStore = React.useContext(ActivityStore);
    const {editMode, selectedActivity} = activityStore;
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                    target={target}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && (
                    <ActivityDetails/>
                )}
                {editMode && (
                    <ActivityForm
                        key={(selectedActivity && selectedActivity.id) || 0}
                        initialFormState={selectedActivity!}
                    />
                )}{' '}
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDashboard);

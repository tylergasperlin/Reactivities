import React from 'react';
import { Grid } from 'semantic-ui-react';

import { iPropsDashboard } from '../../../app/interfaces/iActivity';
import { ActivityList } from './ActivityList';
import { ActivityDetails } from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';

const ActivityDashboard: React.FC<iPropsDashboard> = ({
    activities,
    selectActivity,
    selectedActivity,
    editMode,
    setEditMode,
    editActivity,
    createActivity
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && (
                    <ActivityDetails
                        activity={selectedActivity}
                        selectActivity={selectActivity}
                        setEditMode={setEditMode}
                    />
                )}
                {editMode && (
                    <ActivityForm
                        setEditMode={setEditMode}
                        initialFormState={selectedActivity}
                        editActivity={editActivity}
                        createActivity={createActivity}
                    />
                )}{' '}
            </Grid.Column>
        </Grid>
    );
};

export default ActivityDashboard;

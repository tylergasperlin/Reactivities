import React from 'react';
import { Grid } from 'semantic-ui-react';

import { iPropsDashboard } from '../../app/interfaces/iActivity';
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
    createActivity,
    deleteActivity,
    submitting,
    target
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                    target={target}


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
                        key={(selectedActivity && selectedActivity.id )|| 0}
                        setEditMode={setEditMode}
                        initialFormState={selectedActivity}
                        editActivity={editActivity}
                        createActivity={createActivity}
                        submitting={submitting}
                    />
                )}{' '}
            </Grid.Column>
        </Grid>
    );
};

export default ActivityDashboard;

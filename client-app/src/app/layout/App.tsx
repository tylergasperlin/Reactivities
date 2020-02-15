import './App.css';
import React from 'react';
import { Container } from 'semantic-ui-react';

import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from '../../features/nav/NavBar';
import { iActivity } from '../interfaces/iActivity';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';

const App: React.FC = () => {
    const initialState: iActivity = {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    };

    const [activities, setActivities] = React.useState<iActivity[]>([
        initialState
    ]);
    const [
        selectedActivity,
        setSelectedActivity
    ] = React.useState<iActivity | null>(null);

    const [editMode, setEditMode] = React.useState(false);
    const [loading, setLoading] = React.useState(true)
    const [submitting, setSubmitting] = React.useState(false)

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.filter(a => a.id === id)[0]);
        setEditMode(false);
    };

    const getData = async () => {
        const response = await agent.Activities.list();
        let activities: iActivity[] = [];
        response.forEach(activity => {
            activity.date = activity.date.split('.')[0];
            activities.push(activity);
        });
        setActivities(activities);
        setLoading(false)

    };

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    };

    const handleCreateActivity = async (activity: iActivity) => {
        setSubmitting(true)
        await agent.Activities.create(activity)
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false)
    };

    const handleEditAcivity = async (activity: iActivity) => {
        setSubmitting(true)
        await agent.Activities.update(activity)
        setActivities([
            ...activities.filter(a => a.id !== activity.id),
            activity
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false)

    };

    const handleDeleteActivity = async (id: string) => {
        setSubmitting(true)
        await agent.Activities.delete(id)
        setActivities([...activities.filter(a => a.id !== id)]);
        setSubmitting(false)

    };

    React.useEffect(() => {
        getData();
    }, []);

    if(loading) return <LoadingComponent content='Loading activities...'/>

    return (
        <React.Fragment>
            <NavBar openCreateForm={handleOpenCreateForm} />
            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard
                    activities={activities}
                    selectActivity={handleSelectActivity}
                    selectedActivity={selectedActivity}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    setSelectedActivity={setSelectedActivity}
                    createActivity={handleCreateActivity}
                    editActivity={handleEditAcivity}
                    deleteActivity={handleDeleteActivity}
                    submitting={submitting}
                />
            </Container>
        </React.Fragment>
    );
};

export default App;

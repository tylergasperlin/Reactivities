import './App.css';
import React from 'react';
import { Container } from 'semantic-ui-react';

import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from '../../features/nav/NavBar';
import { iActivity } from '../interfaces/iActivity';
import agent from '../api/agent';

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
    };

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    };

    const handleCreateActivity = (activity: iActivity) => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
    };

    const handleEditAcivity = (activity: iActivity) => {
        setActivities([
            ...activities.filter(a => a.id !== activity.id),
            activity
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
    };

    const handleDeleteActivity = (id: string) => {
        setActivities([...activities.filter(a => a.id !== id)]);
    };

    React.useEffect(() => {
        getData();
    }, []);

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
                />
            </Container>
        </React.Fragment>
    );
};

export default App;

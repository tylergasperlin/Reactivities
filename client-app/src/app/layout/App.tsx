import './App.css';

import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { Container } from 'semantic-ui-react';

import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from '../../features/nav/NavBar';
import { iActivity } from '../interfaces/iActivity';

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
        const response: AxiosResponse<iActivity[]> = await axios.get(
            'http://localhost:5000/api/activities'
        )
        let activities: iActivity[] = [];
        response.data.forEach(activity =>{
            activity.date = activity.date.split('.')[0];
            activities.push(activity)
        })
        setActivities([...response.data]);
    };

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true)
    }

    const handleCreateActivity = (activity: iActivity) =>{
        setActivities([...activities, activity])
        setSelectedActivity(activity)
        setEditMode(false)
    }


    const handleEditAcivity = (activity: iActivity) =>{
        setActivities([...activities.filter(a=>a.id !== activity.id), activity])
        setSelectedActivity(activity)
        setEditMode(false)
    }

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
                />
            </Container>
        </React.Fragment>
    );
};

export default App;

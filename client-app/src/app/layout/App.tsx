import './App.css';

import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { List } from 'semantic-ui-react';

import NavBar from '../../features/Nav/NavBar';
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
    }

    const [activities, updateActivities] = React.useState<iActivity[]>([
        initialState
    ]);

    const getData = async() => {
        const response: AxiosResponse<iActivity[]> = await axios.get('http://localhost:5000/api/activities')
        updateActivities([...response.data])
    };

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <NavBar/>
            <List>
                {activities.map((activity: iActivity) => {
                return <List.Item key={activity.id}>{activity.title}, {activity.description}: {activity.venue}</List.Item>;
                })}
            </List>
        </div>
    );
};

export default App;

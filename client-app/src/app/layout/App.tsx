import './App.css';

import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { Header, Icon, List } from 'semantic-ui-react';

interface iData {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    city: string;
    venue: string;
}



const App: React.FC = () => {
    const initialState: iData = {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activities, updateActivities] = React.useState([
        initialState
    ]);

    const getData = async() => {
        const response: AxiosResponse<iData[]> = await axios.get('http://localhost:5000/api/activities')
        console.log(response.data)
        updateActivities([...response.data])
    };

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Header as='h2'>
                <Icon name='plug' />
                <Header.Content>Reactivities</Header.Content>
            </Header>
            <List>
                {activities.map((activities: iData) => {
                return <List.Item key={activities.id}>{activities.title}, {activities.description}: {activities.venue}</List.Item>;
                })}
            </List>
        </div>
    );
};

export default App;

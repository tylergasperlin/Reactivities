import './App.css';

import axios from 'axios';
import React from 'react';
import { Header, Icon, List } from 'semantic-ui-react';

import logo from './logo.svg';

interface iData {
    id: number;
    name: string;
}

const App: React.FC = () => {
    const [values, updateValues] = React.useState([
        { id: 1, name: 'Value 101' }
    ]);

    const getData = () => {
        axios.get('http://localhost:5000/api/values').then(response => {
            updateValues(response.data);
        });
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
            <img src={logo} className='App-logo' alt='logo' />
            <List>
                {values.map((value: any) => {
                    return <List.Item key={value.id}>{value.name}</List.Item>;
                })}
            </List>
        </div>
    );
};

export default App;

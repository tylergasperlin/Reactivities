import './App.css';

import axios from 'axios';
import React from 'react';

import logo from './logo.svg';

interface iData {
    id: number;
    name: string;
}

const App: React.FC = () => {
    const [values, updateValues] = React.useState([
        { id: 1, name: 'Value 101' }
    ]);

    React.useEffect(() => {
      axios.get('http://localhost:5000/api/values')
      .then((response) => {
        updateValues(response.data)
      })
    });

    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <ul>
                    {values.map((value: any) => {
                        return <li key={value.id}>{value.name}</li>;
                    })}
                </ul>
            </header>
        </div>
    );
};

export default App;

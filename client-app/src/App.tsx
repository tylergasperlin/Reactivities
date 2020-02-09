import React from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  const [values, updateValues] = React.useState([{id: 1, name: 'Value 101'}])

  React.useEffect(() => {
    updateValues([{id: 1, name: 'Value 101'}, {id:2, name: 'Value 102'}])
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {values.map((value: any)=>{
            return(
              <li>{value.name}</li>

            )
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;

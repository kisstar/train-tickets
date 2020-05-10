import React, { createContext } from 'react';

const BatteryContext = createContext();

class Leaf extends React.Component {
  render() {
    return (
      <BatteryContext.Consumer>
        {(battery) => <h1>Battery: {battery}</h1>}
      </BatteryContext.Consumer>
    );
  }
}

class Middle extends React.Component {
  render() {
    return <Leaf />;
  }
}

class App extends React.Component {
  render() {
    return (
      <BatteryContext.Provider value={60}>
        <Middle />
      </BatteryContext.Provider>
    );
  }
}

export default App;

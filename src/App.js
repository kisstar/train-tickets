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
  state = {
    battery: 60,
  };

  render() {
    const { battery } = this.state;

    return (
      <BatteryContext.Provider value={battery}>
        <button
          type='button'
          onClick={() => this.setState({ battery: battery - 1 })}
        >
          Press
        </button>
        <Middle />
      </BatteryContext.Provider>
    );
  }
}

export default App;

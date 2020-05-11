import React, { useState, createContext, useContext } from 'react';

const CountContext = createContext();

class Foo extends React.Component {
  render() {
    return (
      <CountContext.Consumer>
        {(count) => <h1>{count}</h1>}
      </CountContext.Consumer>
    );
  }
}

class Bar extends React.Component {
  static contextType = CountContext;

  render() {
    return <h1>{this.context}</h1>;
  }
}

function Counter() {
  const count = useContext(CountContext);
  return <h1>{count}</h1>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Click {count}</button>
      <CountContext.Provider value={count}>
        <Foo />
        <Bar />
        <Counter />
      </CountContext.Provider>
    </>
  );
}

export default App;

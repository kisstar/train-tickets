import React from 'react';

class Foo extends React.PureComponent {
  render() {
    console.log('Foo render');
    return null;
  }
}

class App extends React.Component {
  state = {
    count: 0,
  };

  render() {
    const { count } = this.state;

    return (
      <>
        <button onClick={() => this.setState({ count: count + 1 })}>Add</button>
        <Foo name='Mike' />
      </>
    );
  }
}

export default App;

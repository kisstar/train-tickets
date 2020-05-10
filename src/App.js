import React from 'react';

class Foo extends React.Component {
  shouldComponentUpdate(nextProps, _nextState) {
    if (nextProps.name === this.props.name) {
      return false;
    }
    return true;
  }

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

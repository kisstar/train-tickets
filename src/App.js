import React from 'react';

class App extends React.Component {
  state = {
    count: 0,
  };

  componentDidMount() {
    document.title = this.state.count;
  }

  componentDidUpdate() {
    document.title = this.state.count;
  }

  render() {
    const { count } = this.state;

    return (
      <>
        <button onClick={() => this.setState({ count: count + 1 })}>
          Click {count}
        </button>
      </>
    );
  }
}

export default App;

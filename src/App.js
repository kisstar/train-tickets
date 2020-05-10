import React from 'react';

class App extends React.Component {
  state = {
    count: 0,
    size: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    },
  };

  onSize = () => {
    this.setState({
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      },
    });
  };

  componentDidMount() {
    document.title = this.state.count;

    window.addEventListener('resize', this.onSize, false);
  }

  componentDidUpdate() {
    document.title = this.state.count;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onSize, false);
  }

  render() {
    const { count, size } = this.state;

    return (
      <>
        <button onClick={() => this.setState({ count: count + 1 })}>
          Click {count}
          Size {size.width}x{size.height}
        </button>
      </>
    );
  }
}

export default App;

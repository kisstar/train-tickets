import React from 'react';

class Foo extends React.PureComponent {
  render() {
    console.log('Foo render');
    return <div>{this.props.person.age}</div>;
  }
}

class App extends React.Component {
  state = {
    count: 0,
    person: {
      age: 1,
    },
  };

  render() {
    const { person } = this.state;

    return (
      <>
        <button
          onClick={() => {
            person.age++;
            this.setState({ person });
          }}
        >
          Add
        </button>
        <Foo person={person} />
      </>
    );
  }
}

export default App;

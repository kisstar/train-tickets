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
    const { count, person } = this.state;

    return (
      <>
        <button
          onClick={() => {
            person.age++;
            this.setState({ count: count + 1 });
          }}
        >
          Add
        </button>
        <Foo person={person} cb={() => {}} />
      </>
    );
  }
}

export default App;

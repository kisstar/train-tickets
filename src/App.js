import React from 'react';

const Foo = React.memo(function Foo(props) {
  console.log('Foo render');
  return <div>{props.person.age}</div>;
});

class App extends React.Component {
  state = {
    count: 0,
    person: {
      age: 1,
    },
  };

  callback = () => {};

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
        <Foo person={person} cb={this.callback} />
      </>
    );
  }
}

export default App;

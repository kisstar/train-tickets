import React from 'react';
import { connect } from 'react-redux';

function App() {
  return <div>Hello world</div>;
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../../components/header';

function Home() {
  const history = useHistory();
  const onBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return <Header title='火车票' onBack={onBack} />;
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

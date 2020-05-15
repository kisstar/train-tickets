import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../../components/header';
import './index.scss';

function Home() {
  const history = useHistory();
  const onBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <div className='home'>
      <Header title='火车票' onBack={onBack} />
      <div className='theme-image'></div>
      <div className='search-container'></div>
      <ul className='btn-list'>
        <li className='btn-item'>
          <span className='icon grab'></span>
          <span className='font'>抢票</span>
        </li>
        <li className='btn-item'>
          <span className='icon order'></span>
          <span className='font'>我的订单</span>
        </li>
      </ul>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

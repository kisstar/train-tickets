import React from 'react';
import { useShallowEqualSelector, useGoBack } from '../../lib/utils';
import { Header } from '../../components';
import Journey from './components/journey';
import './index.scss';

const selectHomeState = (state) => state.home;

function Home() {
  const state = useShallowEqualSelector(selectHomeState);
  const goBack = useGoBack();

  return (
    <div className='home'>
      <Header title='火车票' showBack={true} onBack={goBack} />
      <div className='theme-image'></div>
      <div className='search-container'>
        <Journey from={state.from} to={state.to} />
      </div>
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

export default Home;

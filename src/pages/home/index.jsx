import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useShallowEqualSelector, useGoBack } from '../../lib/utils';
import { Header } from '../../components';
import Journey from './components/journey';
import DepartDate from './components/depart-date';
import './index.scss';

const selectHomeState = (state) => state.home;

function Home() {
  const history = useHistory();
  const state = useShallowEqualSelector(selectHomeState);
  const goBack = useGoBack();
  const toTime = useCallback(() => history.push('/time'), [history]);

  return (
    <div className='home'>
      <Header title='火车票' showBack={true} onBack={goBack} />
      <div className='theme-image'></div>
      <div className='search-container'>
        <Journey from={state.from} to={state.to} />
        <DepartDate onClick={toTime} />
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

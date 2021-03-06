import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  useShallowEqualSelector,
  useGoBack,
  getParamStr,
} from '../../lib/utils';
import { Header } from '../../components';
import Journey from './components/journey';
import DepartDate from './components/depart-date';
import HighSpeedRail from './components/high-speed-rail';
import { useDispatch } from 'react-redux';
import { toggleHighSpeed, exchangeFromTo, showCitySelector } from './store';
import './index.scss';

const selectHomeState = (state) => state.home;

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useShallowEqualSelector(selectHomeState);
  const goBack = useGoBack();
  const toTime = useCallback(() => history.push('/time'), [history]);
  const onToggleHighSpeed = useCallback(() => dispatch(toggleHighSpeed()), [
    dispatch,
  ]);
  const doExchangeFromTo = useCallback(() => {
    dispatch(exchangeFromTo());
  }, [dispatch]);
  const doShowLeftCitySelector = useCallback(() => {
    dispatch(showCitySelector(true));
    history.push('/city');
  }, [dispatch, history]);
  const doShowRightCitySelector = useCallback(() => {
    dispatch(showCitySelector(false));
    history.push('/city');
  }, [dispatch, history]);
  const handleSearch = useCallback(() => {
    const params = {
      from: state.from,
      to: state.to,
      departDate: state.departDate,
      highSpeed: state.highSpeed,
    };
    const paramStr = getParamStr(params);
    history.push(`/trainList${paramStr}`);
  }, [history, state.from, state.to, state.departDate, state.highSpeed]);

  return (
    <div className='home'>
      <Header title='火车票' showBack={true} onBack={goBack} />
      <div className='theme-image'></div>
      <div className='search-container'>
        <Journey
          from={state.from}
          to={state.to}
          onClick={doExchangeFromTo}
          onLeftClick={doShowLeftCitySelector}
          onRightClick={doShowRightCitySelector}
        />
        <DepartDate onClick={toTime} time={state.departDate} />
        <HighSpeedRail checked={state.highSpeed} onToggle={onToggleHighSpeed} />
        <button type='button' className='search-button' onClick={handleSearch}>
          搜 索
        </button>
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

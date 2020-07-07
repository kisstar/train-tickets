import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  useGoBack,
  useShallowEqualSelector,
  h0,
  getParamStr,
  getParamFromStr,
} from '../../lib/utils';
import { useNav } from '../../lib/hooks';
import { Header } from '../../components';
import Nav from './components/nav';
import List from './components/list';
import Bottom from './components/bottom';
import {
  setFrom,
  setTo,
  setDepartDate,
  toggleHighSpeed,
  setSearchParsed,
  setTrainList,
  setTicketTypes,
  setTrainTypes,
  setDepartStations,
  setArriveStations,
  prevDate,
  nextDate,
  toggleIsFiltersVisible,
  toggleOnlyTickets,
  toggleOrderType,
} from './store';
import './index.scss';

const selectTrainState = (state) => state.train;

function TrainList() {
  const dispatch = useDispatch();
  const goBack = useGoBack();
  const { search } = useLocation();
  const state = useShallowEqualSelector(selectTrainState);
  const {
    from,
    to,
    isFiltersVisible,
    departDate,
    highSpeed,
    orderType,
    onlyTickets,
    checkedTicketType,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    searchParsed,
  } = state;

  const bottomCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggleHighSpeed,
        toggleIsFiltersVisible,
        toggleOnlyTickets,
        toggleOrderType,
      },
      dispatch
    );
  }, [dispatch]);

  useEffect(() => {
    const query = getParamFromStr(search);
    dispatch(setFrom(query.from));
    dispatch(setTo(query.to));
    dispatch(setDepartDate(h0(Number(query.departDate))));

    if ('true' === query.highSpeed) {
      dispatch(toggleHighSpeed());
    }

    dispatch(setSearchParsed(true));
  }, [dispatch, search]);

  useEffect(() => {
    if (!searchParsed) return;

    fetch(
      `/train${getParamStr({
        sort: orderType, // 耗时 -> 0，出发 -> ''
        filterTrainType: 5, // 车次类型： 高铁-> 5，特快 -> 3 ...
        onlyTickets: onlyTickets ? 1 : '',
        date: new Date(departDate).toLocaleDateString().replace(/\//g, '-'),
        filterTicketType: Object.keys(checkedTicketType).join(), // 坐席类型
        startStation: Object.keys(checkedDepartStations).join(),
        endStation: Object.keys(checkedArriveStations).join(),
        filterNewDepTimeRange: `${departTimeStart} - ${departTimeEnd}`,
        filterNewArrTimeRange: `${arriveTimeStart} - ${arriveTimeEnd}`,
      })}`
    )
      .then((res) => res.json())
      .then((result) => {
        const {
          dataMap: {
            directTrainInfo: {
              trains,
              filter: { ticketType, trainType, depStation, arrStation },
            },
          },
        } = result;

        dispatch(setTrainList(trains));
        dispatch(setTicketTypes(ticketType));
        dispatch(setTrainTypes(trainType));
        dispatch(setDepartStations(depStation));
        dispatch(setArriveStations(arrStation));
      });
  }, [
    dispatch,
    from,
    to,
    departDate,
    highSpeed,
    orderType,
    onlyTickets,
    checkedTicketType,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    searchParsed,
  ]);

  const navProps = useNav(departDate, dispatch, prevDate, nextDate);

  if (!searchParsed) return null;

  return (
    <div className='train-list'>
      <Header
        title={`${state.from} ⇀ ${state.to}`}
        onBack={goBack}
        showBack
        position='fixed'
      />
      <Nav time={departDate} {...navProps} />
      <List list={state.trainList} />
      <Bottom
        highSpeed={highSpeed}
        orderType={orderType}
        onlyTickets={onlyTickets}
        isFiltersVisible={isFiltersVisible}
        {...bottomCbs}
      />
    </div>
  );
}

export default TrainList;

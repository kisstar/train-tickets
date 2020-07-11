import React, { useState, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ORDER_DEPART } from '../../constant';
import BottomModal from './components/BottomModal';
import ModalTitle from './components/ModalTitle';
import Option from './components/option';
import Slider from './components/slider';
import './index.scss';

function checkedReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'toggle':
      const newState = { ...state };
      if (payload in newState) {
        delete newState[payload];
      } else {
        newState[payload] = true;
      }
      return newState;
    case 'reset':
      return {};
    default:
  }

  return state;
}

function Bottom({
  toggleOrderType,
  toggleHighSpeed,
  toggleOnlyTickets,
  toggleIsFiltersVisible,
  highSpeed,
  orderType,
  onlyTickets,
  isFiltersVisible,
  // 综合筛选
  ticketTypes,
  trainTypes,
  departStations,
  arriveStations,
  checkedTicketTypes,
  checkedTrainTypes,
  checkedDepartStations,
  checkedArriveStations,
  setCheckedTicketTypes,
  setCheckedTrainTypes,
  setCheckedDepartStations,
  setCheckedArriveStations,
  departTimeStart,
  departTimeEnd,
  arriveTimeStart,
  arriveTimeEnd,
  setDepartTimeStart,
  setDepartTimeEnd,
  setArriveTimeStart,
  setArriveTimeEnd,
}) {
  const [localCheckedTicketTypes, localCheckedTicketTypesDispatch] = useReducer(
    checkedReducer,
    checkedTicketTypes,
    (checkedTicketTypes) => {
      return {
        ...checkedTicketTypes,
      };
    }
  );

  const [localCheckedTrainTypes, localCheckedTrainTypesDispatch] = useReducer(
    checkedReducer,
    checkedTrainTypes,
    (checkedTrainTypes) => {
      return {
        ...checkedTrainTypes,
      };
    }
  );

  const [
    localCheckedDepartStations,
    localCheckedDepartStationsDispatch,
  ] = useReducer(
    checkedReducer,
    checkedDepartStations,
    (checkedDepartStations) => {
      return {
        ...checkedDepartStations,
      };
    }
  );

  const [
    localCheckedArriveStations,
    localCheckedArriveStationsDispatch,
  ] = useReducer(
    checkedReducer,
    checkedArriveStations,
    (checkedArriveStations) => {
      return {
        ...checkedArriveStations,
      };
    }
  );

  const [localDepartTimeStart, setLocalDepartTimeStart] = useState(
    () => departTimeStart
  );
  const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(
    () => departTimeEnd
  );
  const [localArriveTimeStart, setLocalArriveTimeStart] = useState(
    () => arriveTimeStart
  );
  const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(
    () => arriveTimeEnd
  );

  const optionGroup = [
    {
      title: '坐席类型',
      options: ticketTypes,
      checkedMap: localCheckedTicketTypes,
      dispatch: localCheckedTicketTypesDispatch,
    },
    {
      title: '车次类型',
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      dispatch: localCheckedTrainTypesDispatch,
    },
    {
      title: '出发车站',
      options: departStations,
      checkedMap: localCheckedDepartStations,
      dispatch: localCheckedDepartStationsDispatch,
    },
    {
      title: '到达车站',
      options: arriveStations,
      checkedMap: localCheckedArriveStations,
      dispatch: localCheckedArriveStationsDispatch,
    },
  ];

  const noChecked = useMemo(() => {
    return (
      Object.keys(checkedTicketTypes).length === 0 &&
      Object.keys(checkedTrainTypes).length === 0 &&
      Object.keys(checkedDepartStations).length === 0 &&
      Object.keys(checkedArriveStations).length === 0 &&
      departTimeStart === 0 &&
      departTimeEnd === 24 &&
      arriveTimeStart === 0 &&
      arriveTimeEnd === 24
    );
  }, [
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
  ]);

  const isResetDisabled = useMemo(() => {
    return (
      Object.keys(localCheckedTicketTypes).length === 0 &&
      Object.keys(localCheckedTrainTypes).length === 0 &&
      Object.keys(localCheckedDepartStations).length === 0 &&
      Object.keys(localCheckedArriveStations).length === 0 &&
      localDepartTimeStart === 0 &&
      localDepartTimeEnd === 24 &&
      localArriveTimeStart === 0 &&
      localArriveTimeEnd === 24
    );
  }, [
    localCheckedTicketTypes,
    localCheckedTrainTypes,
    localCheckedDepartStations,
    localCheckedArriveStations,
    localDepartTimeStart,
    localDepartTimeEnd,
    localArriveTimeStart,
    localArriveTimeEnd,
  ]);

  // 只在按下确定按钮时才更新上级 store 中的状态
  const sure = () => {
    setCheckedTicketTypes(localCheckedTicketTypes);
    setCheckedTrainTypes(localCheckedTrainTypes);
    setCheckedDepartStations(localCheckedDepartStations);
    setCheckedArriveStations(localCheckedArriveStations);
    setDepartTimeStart(localDepartTimeStart);
    setDepartTimeEnd(localDepartTimeEnd);
    setArriveTimeStart(localArriveTimeStart);
    setArriveTimeEnd(localArriveTimeEnd);
    toggleIsFiltersVisible();
  };

  const reset = () => {
    if (isResetDisabled) {
      return;
    }

    localCheckedTicketTypesDispatch({ type: 'reset' });
    localCheckedTrainTypesDispatch({ type: 'reset' });
    localCheckedDepartStationsDispatch({ type: 'reset' });
    localCheckedArriveStationsDispatch({ type: 'reset' });
    setLocalDepartTimeStart(0);
    setLocalDepartTimeEnd(24);
    setLocalArriveTimeStart(0);
    setLocalArriveTimeEnd(24);
  };

  return (
    <div className='bottom'>
      <div className='bottom-filters'>
        <span className='item' onClick={toggleOrderType}>
          <i className='icon'>&#xf065;</i>
          {orderType === ORDER_DEPART ? '出发 早→晚' : '耗时 短→长'}
        </span>
        <span
          className={classnames('item', { 'item-on': highSpeed })}
          onClick={toggleHighSpeed}
        >
          <i className='icon'>{highSpeed ? '\uf43f' : '\uf43e'}</i>
          只看高铁动车
        </span>
        <span
          className={classnames('item', { 'item-on': onlyTickets })}
          onClick={toggleOnlyTickets}
        >
          <i className='icon'>{onlyTickets ? '\uf43d' : '\uf43c'}</i>
          只看有票
        </span>
        <span
          className={classnames('item', {
            'item-on': isFiltersVisible || !noChecked,
          })}
          onClick={toggleIsFiltersVisible}
        >
          <i className='icon'>{noChecked ? '\uf0f7' : '\uf446'}</i>
          综合筛选
        </span>
      </div>
      {isFiltersVisible && (
        <BottomModal>
          <ModalTitle
            ok={sure}
            cancel={reset}
            isResetDisabled={isResetDisabled}
          />
          {optionGroup.map((group) => (
            <Option {...group} key={group.title} />
          ))}
          <Slider
            title='出发时间'
            currentStartHours={localDepartTimeStart}
            currentEndHours={localDepartTimeEnd}
            onStartChanged={setLocalDepartTimeStart}
            onEndChanged={setLocalDepartTimeEnd}
          />
          <Slider
            title='到达时间'
            currentStartHours={localArriveTimeStart}
            currentEndHours={localArriveTimeEnd}
            onStartChanged={setLocalArriveTimeStart}
            onEndChanged={setLocalArriveTimeEnd}
          />
        </BottomModal>
      )}
    </div>
  );
}

Bottom.propTypes = {
  toggleOrderType: PropTypes.func.isRequired,
  toggleHighSpeed: PropTypes.func.isRequired,
  toggleOnlyTickets: PropTypes.func.isRequired,
  toggleIsFiltersVisible: PropTypes.func.isRequired,
  highSpeed: PropTypes.bool.isRequired,
  orderType: PropTypes.number.isRequired,
  onlyTickets: PropTypes.bool.isRequired,
  isFiltersVisible: PropTypes.bool.isRequired,
  // 综合筛选
  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  departStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  checkedArriveStations: PropTypes.object.isRequired,
  departTimeStart: PropTypes.number.isRequired,
  departTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
  setCheckedTicketTypes: PropTypes.func.isRequired,
  setCheckedTrainTypes: PropTypes.func.isRequired,
  setCheckedDepartStations: PropTypes.func.isRequired,
  setCheckedArriveStations: PropTypes.func.isRequired,
  setDepartTimeStart: PropTypes.func.isRequired,
  setDepartTimeEnd: PropTypes.func.isRequired,
  setArriveTimeStart: PropTypes.func.isRequired,
  setArriveTimeEnd: PropTypes.func.isRequired,
};

export default Bottom;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ORDER_DEPART } from '../../constant';
import BottomModal from './components/BottomModal';
import ModalTitle from './components/ModalTitle';
import Option from './components/Option';
import Slider from './components/slider';
import './index.scss';

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
  const [
    localCheckedTicketTypes,
    setLocalCheckedTicketTypes,
  ] = useState(() => ({ ...checkedTicketTypes }));

  const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState(() => ({
    ...checkedTrainTypes,
  }));

  const [
    localCheckedDepartStations,
    setLocalCheckedDepartStations,
  ] = useState(() => ({ ...checkedDepartStations }));

  const [
    localCheckedArriveStations,
    setLocalCheckedArriveStations,
  ] = useState(() => ({ ...checkedArriveStations }));

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
      update: setLocalCheckedTicketTypes,
    },
    {
      title: '车次类型',
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      update: setLocalCheckedTrainTypes,
    },
    {
      title: '出发车站',
      options: departStations,
      checkedMap: localCheckedDepartStations,
      update: setLocalCheckedDepartStations,
    },
    {
      title: '到达车站',
      options: arriveStations,
      checkedMap: localCheckedArriveStations,
      update: setLocalCheckedArriveStations,
    },
  ];

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
    // if (isResetDisabled) {
    //   return;
    // }

    setLocalCheckedTicketTypes({});
    setLocalCheckedTrainTypes({});
    setLocalCheckedDepartStations({});
    setLocalCheckedArriveStations({});
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
            'item-on': isFiltersVisible,
          })}
          onClick={toggleIsFiltersVisible}
        >
          <i className='icon'>{'\uf0f7'}</i>
          综合筛选
        </span>
      </div>
      {isFiltersVisible && (
        <BottomModal>
          <ModalTitle ok={sure} cancel={reset} />
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

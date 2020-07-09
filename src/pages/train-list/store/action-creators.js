import * as actionTypes from './action-types';
import { ORDER_DEPART, ORDER_DURATION } from './reducer';

export function setFrom(city) {
  return {
    type: actionTypes.SET_FROM,
    payload: city,
  };
}

export function setTo(city) {
  return {
    type: actionTypes.SET_TO,
    payload: city,
  };
}

export function setDepartDate(departDate) {
  return {
    type: actionTypes.SET_DEPART_DATE,
    payload: departDate,
  };
}

export function toggleHighSpeed() {
  return (dispatch, getState) => {
    const { highSpeed } = getState().train;
    dispatch({
      type: actionTypes.SET_HIGHSPEED,
      payload: !highSpeed,
    });
  };
}

export function setTrainList(trainList) {
  return {
    type: actionTypes.SET_TRAIN_LIST,
    payload: trainList,
  };
}

export function toggleOrderType() {
  return (dispatch, getState) => {
    const { orderType } = getState().train;
    if (ORDER_DEPART === orderType) {
      dispatch({
        type: actionTypes.SET_ORDER_TYPE,
        payload: ORDER_DURATION,
      });
    } else {
      dispatch({
        type: actionTypes.SET_ORDER_TYPE,
        payload: ORDER_DEPART,
      });
    }
  };
}

export function toggleOnlyTickets() {
  return (dispatch, getState) => {
    const { onlyTickets } = getState().train;
    dispatch({
      type: actionTypes.SET_ONLY_TICKETS,
      payload: !onlyTickets,
    });
  };
}

export function setTicketTypes(ticketTypes) {
  return {
    type: actionTypes.SET_TICKET_TYPES,
    payload: ticketTypes,
  };
}

export function setCheckedTicketTypes(checkedTicketTypes) {
  return {
    type: actionTypes.SET_CHECKED_TICKET_TYPE,
    payload: checkedTicketTypes,
  };
}

export function setTrainTypes(trainTypes) {
  return {
    type: actionTypes.SET_TRAIN_TYPES,
    payload: trainTypes,
  };
}

export function setCheckedTrainTypes(checkedTrainTypes) {
  return {
    type: actionTypes.SET_CHECKED_TRAIN_TYPES,
    payload: checkedTrainTypes,
  };
}

export function setDepartStations(departStations) {
  return {
    type: actionTypes.SET_DEPART_STATIONS,
    payload: departStations,
  };
}

export function setCheckedDepartStations(checkedDepartStations) {
  return {
    type: actionTypes.SET_CHECKED_DEPART_STATIONS,
    payload: checkedDepartStations,
  };
}

export function setArriveStations(arriveStations) {
  return {
    type: actionTypes.SET_ARRIVE_STATIONS,
    payload: arriveStations,
  };
}

export function setCheckedArriveStations(checkedArriveStations) {
  return {
    type: actionTypes.SET_CHECKED_ARRIVE_STATIONS,
    payload: checkedArriveStations,
  };
}

export function setDepartTimeStart(departTimeStart) {
  return {
    type: actionTypes.SET_DEPART_TIME_START,
    payload: departTimeStart,
  };
}

export function setDepartTimeEnd(departTimeEnd) {
  return {
    type: actionTypes.SET_DEPART_TIME_END,
    payload: departTimeEnd,
  };
}

export function setArriveTimeStart(arriveTimeStart) {
  return {
    type: actionTypes.SET_ARRIVE_TIME_START,
    payload: arriveTimeStart,
  };
}

export function setArriveTimeEnd(arriveTimeEnd) {
  return {
    type: actionTypes.SET_ARRIVE_TIME_END,
    payload: arriveTimeEnd,
  };
}

export function toggleIsFiltersVisible() {
  return (dispatch, getState) => {
    const { isFiltersVisible } = getState().train;
    dispatch({
      type: actionTypes.SET_IS_FILTERS_VISIABLE,
      payload: !isFiltersVisible,
    });
  };
}

export function setSearchParsed(searchParsed) {
  return {
    type: actionTypes.SET_SEARCH_PARSED,
    payload: searchParsed,
  };
}

export function prevDate() {
  return (dispatch, getState) => {
    const { departDate } = getState().train;
    dispatch(setDepartDate(departDate - 86400 * 1000));
  };
}

export function nextDate() {
  return (dispatch, getState) => {
    const { departDate } = getState().train;
    dispatch(setDepartDate(departDate + 86400 * 1000));
  };
}

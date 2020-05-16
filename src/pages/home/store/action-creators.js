import * as actionTypes from './action-types';

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

export function exchangeFromTo() {
  return (dispatch, getState) => {
    const { from, to } = getState().home;
    dispatch(setFrom(to));
    dispatch(setTo(from));
  };
}

export function showCitySelector(currentSelectingLeftCity) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_CURRENT_SELECTING_LEFT_CITY,
      payload: currentSelectingLeftCity,
    });
  };
}

export function setSelectedCity(city) {
  return (dispatch, getState) => {
    const { currentSelectingLeftCity } = getState();

    if (currentSelectingLeftCity) {
      dispatch(setFrom(city));
    } else {
      dispatch(setTo(city));
    }
  };
}

export function showDateSelector() {
  return {
    type: actionTypes.SET_IS_DATE_SELECTOR_VISIBLE,
    payload: true,
  };
}

export function hideDateSelector() {
  return {
    type: actionTypes.SET_IS_DATE_SELECTOR_VISIBLE,
    payload: false,
  };
}

export function toggleHighSpeed() {
  return (dispatch, getState) => {
    const { highSpeed } = getState();
    dispatch({
      type: actionTypes.SET_HIGHSPEED,
      payload: !highSpeed,
    });
  };
}

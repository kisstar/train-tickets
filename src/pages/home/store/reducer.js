import * as actionTypes from './action-types';

const initState = {
  from: '北京',
  to: '上海',
  isCitySelectorVisible: false,
  currentSelectingLeftCity: false,
  cityData: null,
  isLoadingCityData: false,
  isDateSelectorVisible: false,
  departDate: Date.now(),
  highSpeed: false,
};

function reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_FROM:
      return { ...state, from: payload };
    case actionTypes.SET_TO:
      return { ...state, to: payload };
    case actionTypes.SET_IS_CITY_SELECTOR_VISIBLE:
    case actionTypes.SET_CURRENT_SELECTING_LEFT_CITY:
      return { ...state, currentSelectingLeftCity: payload };
    case actionTypes.SET_CITY_DATA:
    case actionTypes.SET_IS_LOADING_CITY_DATA:
    case actionTypes.SET_IS_DATE_SELECTOR_VISIBLE:
    case actionTypes.SET_DEPART_DATE:
    case actionTypes.SET_HIGHSPEED:
    default:
      return state;
  }
}

export default reducer;

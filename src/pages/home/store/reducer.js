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
    case actionTypes.SET_TO:
    case actionTypes.SET_ISCITYSELECTORVISIBLE:
    case actionTypes.SET_CURRENTSELECTINGLEFTCITY:
    case actionTypes.SET_CITYDATA:
    case actionTypes.SET_ISLOADINGCITYDATA:
    case actionTypes.SET_ISDATESELECTORVISIBLE:
    case actionTypes.SET_DEPARTDATE:
    case actionTypes.SET_HIGHSPEED:
      return payload;
    default:
      return state;
  }
}

export default reducer;

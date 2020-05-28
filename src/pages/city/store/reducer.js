import * as actionTypes from './action-types';

const initState = {
  cityData: null,
  isLoadingCityData: false,
};

function reducer(state = initState, action) {
  const { type, payload = {} } = action;
  switch (type) {
    case actionTypes.SET_CITY_DATA:
      return { ...state, cityData: payload };
    case actionTypes.SET_IS_LOADING_CITY_DATA:
      return { ...state, isLoadingCityData: payload };
    default:
      return state;
  }
}

export default reducer;

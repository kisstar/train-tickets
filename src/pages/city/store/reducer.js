import * as actionTypes from './action-types';

const initState = {
  cityData: null,
  isLoadingCityData: false,
};

function reducer(state = initState, action) {
  const { type, payload = {} } = action;
  switch (type) {
    case actionTypes.SET_CITY_DATA:
    case actionTypes.SET_IS_LOADING_CITY_DATA:
    default:
      return { ...state, payload };
  }
}

export default reducer;

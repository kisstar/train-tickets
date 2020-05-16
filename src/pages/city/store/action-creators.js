import * as actionTypes from './action-types';

export function setIsLoadingCityData(isLoadingCityData) {
  return {
    type: actionTypes.SET_IS_LOADING_CITY_DATA,
    payload: isLoadingCityData,
  };
}

export function setCityData(cityDate) {
  return {
    type: actionTypes.SET_CITY_DATA,
    payload: cityDate,
  };
}

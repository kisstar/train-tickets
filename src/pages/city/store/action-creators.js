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

export function setSearchKeyword(kw) {
  return {
    type: actionTypes.SET_SEARCH_KEYWORD,
    payload: kw,
  };
}

export function setSearchCityDate(cityDate) {
  return {
    type: actionTypes.SET_SEARCH_CITY_DATA,
    payload: cityDate,
  };
}

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGoBack, useShallowEqualSelector } from '../../lib/utils';
import {
  setIsLoadingCityData,
  setCityData,
  setSearchCityDate,
  setSearchKeyword,
} from './store';
import { setSelectedCity } from '../home/store';
import CitySuggest from './components/city-suggest';
import CitySelector from './components/city-selector';
import './index.scss';
import { useCallback } from 'react';

const selectCityState = (state) => state.city;

function City() {
  const goBack = useGoBack();
  const state = useShallowEqualSelector(selectCityState);
  const dispatch = useDispatch();
  const onSelect = useCallback(
    (name) => {
      dispatch(setSelectedCity(name));
      goBack();
    },
    [dispatch, goBack]
  );
  const getCityData = useCallback(() => {
    if (state.isLoadingCityData) {
      return;
    }
    dispatch(setIsLoadingCityData(true));
    fetch('/read/cities')
      .then((res) => res.json())
      .then((cityData) => dispatch(setCityData(cityData)))
      .catch(() => dispatch(setCityData([])))
      .finally(() => {
        dispatch(setIsLoadingCityData(false));
      });
  }, [dispatch, state.isLoadingCityData]);
  const getSearchCityDate = useCallback(() => {
    let ignore = false;
    fetch(`/read/search?keyword=${state.keyword}`)
      .then((res) => res.json())
      .then((res) => {
        const { result } = res;
        if (!ignore) {
          dispatch(setSearchCityDate(result));
        }
      });
    return () => (ignore = true);
  }, [dispatch, state.keyword]);
  const setKeyword = useCallback((kw) => dispatch(setSearchKeyword(kw)), [
    dispatch,
  ]);

  useEffect(getCityData, []);
  useEffect(getSearchCityDate, [state.keyword]);

  const cityData = state.cityData || {};
  const { cityList = [], hotCities = [] } = cityData;

  return (
    <div className='city'>
      <CitySuggest
        onChange={setKeyword}
        searchCityData={state.searchCityData}
        onBack={goBack}
        placeholder='城市、车站的中文或拼音'
      />
      {!!state.keyword || (
        <CitySelector
          cityList={cityList}
          hotCities={hotCities}
          onSelect={onSelect}
        />
      )}
    </div>
  );
}

export default City;

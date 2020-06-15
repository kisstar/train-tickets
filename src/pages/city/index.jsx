import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGoBack, useShallowEqualSelector } from '../../lib/utils';
import { setIsLoadingCityData, setCityData } from './store';
import { setSelectedCity } from '../home/store';
import { CitySuggest, CitySelector } from '../../components';
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

  function getCityData() {
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
  }

  useEffect(getCityData, []);

  const cityData = state.cityData || {};
  const { cityList = [], hotCities = [] } = cityData;

  return (
    <div className='city'>
      <CitySuggest onBack={goBack} placeholder='城市、车站的中文或拼音' />
      <CitySelector
        cityList={cityList}
        hotCities={hotCities}
        onSelect={onSelect}
      />
    </div>
  );
}

export default City;

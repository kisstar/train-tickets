import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGoBack, useShallowEqualSelector } from '../../lib/utils';
import { setIsLoadingCityData, setCityData } from './store';
import { Header } from '../../components';
import './index.scss';

const selectCityState = (state) => state.city;

function City() {
  const goBack = useGoBack();
  const state = useShallowEqualSelector(selectCityState);
  const dispatch = useDispatch();

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

  useEffect(getCityData, [goBack]);

  return (
    <div className='city'>
      <Header type='search' onBack={goBack} />
    </div>
  );
}

export default City;

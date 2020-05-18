import React from 'react';
import { Header } from '../../components';
import { useGoBack } from '../../lib/utils';
import './index.scss';

function City() {
  const goBack = useGoBack();

  return (
    <div className='city'>
      <Header type='search' onBack={goBack} />
    </div>
  );
}

export default City;

import React from 'react';
import { useGoBack } from '../../lib/utils';
import { Header } from '../../components';
import './index.scss';

function Time() {
  const goBack = useGoBack();

  return (
    <div className='time'>
      <Header title='火车票' showBack={true} onBack={goBack} />
    </div>
  );
}

export default Time;

import React from 'react';
import Nav from './components/nav';
import List from './components/list';
import Bottom from './components/bottom';
import './index.scss';

function TrainList() {
  return (
    <div className='train-list'>
      <Nav />
      <List />
      <Bottom />
    </div>
  );
}

export default TrainList;

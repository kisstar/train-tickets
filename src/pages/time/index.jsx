import React from 'react';
import { useGoBack } from '../../lib/utils';
import { Header } from '../../components';
import Month from './components/Month';
import './index.scss';

function Time() {
  const goBack = useGoBack();
  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setDate(1);
  const monthQueue = [now.getTime() /* 当月一日零时零分零秒零毫秒的时间戳 */];
  now.setMonth(now.getMonth() + 1);
  monthQueue.push(now.getTime()); // 次月
  now.setMonth(now.getMonth() + 1);
  monthQueue.push(now.getTime());

  return (
    <div className='time'>
      <Header title='火车票' showBack={true} onBack={goBack} />
      {monthQueue.map((timeStamp) => (
        <Month key={timeStamp} startTime={timeStamp} />
      ))}
    </div>
  );
}

export default Time;

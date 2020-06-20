import React from 'react';
import PropTypes from 'prop-types';
import Week from '../week';
import './index.scss';

function Month({ startTime, onSelect }) {
  const startDay = new Date(startTime);
  const currentDay = new Date(startTime);
  const month = startDay.getMonth(); // 避免在循环中多次取值
  let currentDate = startDay.getDate(),
    days = []; // 每月的天数

  while (month === currentDay.getMonth()) {
    days.push(currentDay.getTime());
    currentDay.setDate(++currentDate);
  }

  // 在日历显示中，每行七列。星期从左到右、从一到日排列
  // 当每月的第一天不是周一时，前面的空应当留白。同理，最后一天如果不是周日，后面也当留白
  // 也就是说这里我们得到的天数 days 应当是七的倍数

  const weekDay = startDay.getDay();
  days = Array(0 === weekDay ? 6 : weekDay - 1) // 如果第一天是周日则补充 6 个空节点，否则...
    .fill(null)
    .concat(days);

  const lastDay = new Date(days[days.length - 1]);
  const lastWeekDay = lastDay.getDay();
  days = days.concat(Array(0 === lastWeekDay ? 0 : 7 - lastWeekDay).fill(null));

  const rows = days.length / 7;
  const weeeks = [];
  for (let row = 0; row < rows; ++row) {
    weeeks.push(days.slice(row * 7, (row + 1) * 7));
  }

  const title = `${startDay.getFullYear()}年${startDay.getMonth() + 1}月`;

  return (
    <div className='month'>
      <Week onSelect={onSelect} title={title} weeeks={weeeks} />
    </div>
  );
}

Month.propTypes = {
  startTime: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

export default Month;

import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import './week.scss';

function Week({ title, weeeks, onSelect }) {
  return (
    <div className='week'>
      <table>
        <thead>
          <tr>
            <th colSpan='7'>{title}</th>
          </tr>
        </thead>
        <tbody>
          <tr className='week-name'>
            <th>周一</th>
            <th>周二</th>
            <th>周三</th>
            <th>周四</th>
            <th>周五</th>
            <th className='weekends'>周六</th>
            <th className='weekends'>周日</th>
          </tr>
          {weeeks.map((week, index) => (
            <tr key={index}>
              {week.map((day, _index) => (
                <Day key={_index} day={day} onSelect={onSelect} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Week.propTypes = {
  title: PropTypes.string.isRequired,
  weeeks: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Week;

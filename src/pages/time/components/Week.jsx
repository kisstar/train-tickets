import React from 'react';
import PropTypes from 'prop-types';
import './week.scss';

function Week({ title, weeeks }) {
  return (
    <div className='week'>
      <table>
        <thead>
          <tr>
            <th colSpan='7'>{title}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>周一</th>
            <th>周二</th>
            <th>周三</th>
            <th>周四</th>
            <th>周五</th>
            <th className='weekends'>周六</th>
            <th className='weekends'>周日</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

Week.propTypes = {
  title: PropTypes.string.isRequired,
  weeeks: PropTypes.array.isRequired,
};

export default Week;

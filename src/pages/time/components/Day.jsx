import React from 'react';
import PropTypes from 'prop-types';
import { h0 } from '../../../lib/utils';
import './day.scss';

function Day({ day, onSelect }) {
  const classes = ['day'];
  const now = h0();

  if (!day) {
    return <td className='null'>{day}</td>;
  }

  if (day < now) {
    classes.push('disabled');
  }

  if ([6, 0].includes(new Date(day).getDay())) {
    classes.push('weekends');
  }

  const dateStr = now === day ? '今天' : new Date(day).getDate();

  return (
    <td className={classes.join(' ')} onClick={() => onSelect(day)}>
      {dateStr}
    </td>
  );
}

Day.propTypes = {
  day: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

export default Day;

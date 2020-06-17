import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { h0, noop } from '../../../../lib/utils';
import './index.scss';

function DepartDate({ time = Date.now(), onClick = noop }) {
  const date = new Date(time);
  const _time = h0(time);
  const displayDate = useMemo(
    () => `${date.toLocaleDateString().split(/\//).slice(-2).join('月')}日`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_time]
  );
  const week = `周${['日', '一', '二', '三', '四', '五', '六'][date.getDay()]}`;
  const isToday = _time === h0();

  return (
    <div className='depart-date' onClick={onClick}>
      <span className='date'>{displayDate}</span>
      <span className='week'>{week}</span>
      {isToday && <span className='today'>(今天)</span>}
    </div>
  );
}

DepartDate.propTypes = {
  time: PropTypes.number,
  onClick: PropTypes.func,
};

export default DepartDate;

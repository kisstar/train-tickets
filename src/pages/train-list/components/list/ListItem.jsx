import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { getParamStr } from '../../../../lib/utils';

const ListItem = memo(function ListItem(props) {
  const {
    dTime,
    aTime,
    dStation,
    aStation,
    trainNumber,
    date,
    time,
    priceMsg,
    dayAfter,
  } = props;

  const url = useMemo(() => {
    const pStr = getParamStr({
      aStation,
      dStation,
      trainNumber,
      date,
    });
    return 'ticket.html' + pStr;
  }, [aStation, dStation, trainNumber, date]);

  return (
    <li className='list-item'>
      <a href={url}>
        <span className='item-time'>
          <em>{dTime}</em>
          <br />
          <em className='em-light'>
            {aTime} <i className='time-after'>{dayAfter}</i>
          </em>
        </span>
        <span className='item-stations'>
          <em>
            <i className='train-station train-start'>始</i>
            {dStation}
          </em>
          <br />
          <em className='em-light'>
            <i className='train-station train-end'>终</i>
            {aStation}
          </em>
        </span>
        <span className='item-train'>
          <em>{trainNumber}</em>
          <br />
          <em className='em-light'>{time}</em>
        </span>
        <span className='item-ticket'>
          <em>{priceMsg}</em>
          <br />
          <em className='em-light-orange'>可抢票</em>
        </span>
      </a>
    </li>
  );
});

ListItem.propTypes = {
  dTime: PropTypes.string.isRequired,
  aTime: PropTypes.string.isRequired,
  dStation: PropTypes.string.isRequired,
  aStation: PropTypes.string.isRequired,
  trainNumber: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  priceMsg: PropTypes.string.isRequired,
  dayAfter: PropTypes.string.isRequired,
};

export default ListItem;

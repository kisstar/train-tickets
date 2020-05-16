import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { exchangeFromTo, showCitySelector } from '../../store';
import switchIcon from '../../../../images/switch.svg';
import './index.scss';

function Journey({ from, to }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const doExchangeFromTo = useCallback(() => {
    dispatch(exchangeFromTo());
  }, [dispatch]);
  const doShowCitySelector = useCallback(
    (pos) => {
      dispatch(showCitySelector(pos));
      history.push('/city');
    },
    [dispatch, history]
  );

  return (
    <div className='journey'>
      <button type='button' onClick={() => doShowCitySelector(true)}>
        {from}
      </button>
      <button type='button' onClick={doExchangeFromTo}>
        <img src={switchIcon} alt='switchIcon' />
      </button>
      <button type='button' onClick={() => doShowCitySelector(false)}>
        {to}
      </button>
    </div>
  );
}

Journey.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default Journey;

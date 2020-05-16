import React, { useCallback } from 'react';
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
    <div className='journey' onClick={() => doShowCitySelector(true)}>
      <button type='button'>{from}</button>
      <button type='button' onClick={doExchangeFromTo}>
        <img src={switchIcon} alt='switchIcon' />
      </button>
      <button type='to' onClick={() => doShowCitySelector(false)}>
        {to}
      </button>
    </div>
  );
}

export default Journey;

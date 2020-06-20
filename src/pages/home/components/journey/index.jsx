import React from 'react';
import PropTypes from 'prop-types';
import switchIcon from '../../../../images/switch.svg';
import './index.scss';

function Journey({ from, to, onLeftClick, onClick, onRightClick }) {
  return (
    <div className='journey'>
      <button type='button' onClick={onLeftClick}>
        {from}
      </button>
      <button type='button' onClick={onClick}>
        <img src={switchIcon} alt='switchIcon' />
      </button>
      <button type='button' onClick={onRightClick}>
        {to}
      </button>
    </div>
  );
}

Journey.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onLeftClick: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onRightClick: PropTypes.func.isRequired,
};

export default Journey;

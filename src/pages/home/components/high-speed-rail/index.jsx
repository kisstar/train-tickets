import React from 'react';
import PropTypes from 'prop-types';
import { noop } from '../../../../lib/utils';
import './index.scss';

function HighSpeedRail({ checked = false, onToggle = noop }) {
  return (
    <div className='high-speed-rail'>
      <label>
        <input
          className='checkbox'
          type='checkbox'
          checked={checked}
          onChange={onToggle}
        />{' '}
        只看高铁/动车
      </label>
    </div>
  );
}

HighSpeedRail.propTypes = {
  checked: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default HighSpeedRail;

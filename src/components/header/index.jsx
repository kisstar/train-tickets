import React from 'react';
import PropTypes from 'prop-types';
import { noop } from '../../lib/utils';
import './index.scss';

function Header({ showBack, onBack = noop, title }) {
  return (
    <div className='header'>
      {showBack && (
        <div className='header-back' onClick={onBack}>
          <svg width='42' height='42'>
            <polyline
              points='25,13 16,21 25,29'
              stroke='#fff'
              strokeWidth='2'
              fill='none'
            />
          </svg>
        </div>
      )}
      <h1 className='header-title'>{title}</h1>
    </div>
  );
}

Header.propTypes = {
  showBack: PropTypes.bool,
  onBack: PropTypes.func,
  title: PropTypes.string,
};

export default Header;

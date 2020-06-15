import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from '../../lib/utils';
import './index.scss';

function CitySuggest({ onBack = noop, onChange = noop, placeholder = '' }) {
  const [keyWord, setKeyWord] = useState('');
  const kw = useMemo(() => keyWord.trim(), [keyWord]);

  return (
    <div className='search'>
      <div className='search-back' onClick={onBack}>
        <svg width='42' height='42'>
          <polyline
            points='25,13 16,21 25,29'
            stroke='#fff'
            strokeWidth='2'
            fill='none'
          />
        </svg>
      </div>
      <i className='search-icon'>&#xf067;</i>
      <input
        value={keyWord}
        className='search-input'
        placeholder={placeholder}
        onChange={(e) => {
          const { value } = e.target;
          setKeyWord(value);
          onChange(kw);
        }}
      />
      <i
        className={classnames('search-clean', {
          hidden: keyWord.length === 0,
        })}
        onClick={() => setKeyWord('')}
      >
        &#xf063;
      </i>
    </div>
  );
}

CitySuggest.propTypes = {
  onBack: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default CitySuggest;

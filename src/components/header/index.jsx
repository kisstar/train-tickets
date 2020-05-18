import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from '../../lib/utils';
import './index.scss';

function Header({ type = 'title', onBack, title, onChange = noop }) {
  const [keyWord, setKeyWord] = useState('');
  const kw = useMemo(() => keyWord.trim(), [keyWord]);

  return (
    <div className='header'>
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
      {type === 'title' && <h1 className='header-title'>{title}</h1>}
      {type === 'search' && (
        <>
          <i className='search-icon'>&#xf067;</i>
          <input
            value={keyWord}
            className='header-search'
            placeholder='城市、车站的中文或拼音'
            onChange={(e) => {
              const { value } = e.target;
              setKeyWord(value);
              onChange(value);
            }}
          />
          <i
            className={classnames('search-clean', {
              hidden: kw.length === 0,
            })}
            onClick={() => setKeyWord('')}
          >
            &#xf063;
          </i>
        </>
      )}
    </div>
  );
}

Header.propTypes = {
  type: PropTypes.oneOf(['title', 'search']),
  title: PropTypes.string,
  onBack: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};

export default Header;

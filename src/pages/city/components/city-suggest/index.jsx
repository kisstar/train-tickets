import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from '../../../../lib/utils';
import './index.scss';

function CitySuggest({
  onBack = noop,
  onChange = noop,
  placeholder = '',
  searchCityData,
}) {
  const [keyWord, setKeyWord] = useState('');
  const kw = useMemo(() => keyWord.trim(), [keyWord]);
  useEffect(() => {
    onChange(kw);
  }, [kw, onChange]);

  return (
    <>
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
          onChange={(e) => setKeyWord(e.target.value)}
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
      <div className='suggest-result'>
        {searchCityData &&
          searchCityData.map((item) => (
            <div key={item.key} className='suggest-item'>
              {item.display}
            </div>
          ))}
      </div>
    </>
  );
}

CitySuggest.propTypes = {
  onBack: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  searchCityData: PropTypes.array,
};

export default CitySuggest;

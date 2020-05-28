import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { noop } from '../../lib/utils';
import './index.scss';

function CitySelector({ cityList = [], onSelect = noop }) {
  return (
    <div className='city-selector'>
      {cityList.map((item) => {
        const { citys = [] } = item;
        return (
          <div className='city-block' key={item.title}>
            <div className='title'>{item.title}</div>
            <ul className='cities'>
              {citys.map((city) => (
                <li
                  className='city-item'
                  key={city.name}
                  onClick={() => onSelect(city.name)}
                >
                  {city.name}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

CitySelector.propTypes = {
  cityList: PropTypes.array,
  onSelect: PropTypes.func,
};

export default memo(CitySelector);

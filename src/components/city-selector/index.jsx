import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { noop, currentPosition, getPosition } from '../../lib/utils';
import './index.scss';
import { useState } from 'react';
import { useCallback } from 'react';

function CitySelector({ cityList = [], hotCities = [], onSelect = noop }) {
  const [currntPos, setCurrentPos] = useState(currentPosition);

  const getPos = useCallback(async () => {
    setCurrentPos(await getPosition());
  }, []);

  return (
    <div className='city-selector'>
      <div className='city-block'>
        <div className='title'>定位</div>
        <div className='btn-group'>
          <div className='btn-item' onClick={getPos}>
            {currntPos ? currntPos : '定位'}
          </div>
        </div>
      </div>
      <div className='city-block'>
        <div className='title'>热门</div>
        <div className='btn-group'>
          {hotCities.map((item) => (
            <div
              key={item.name}
              className='btn-item'
              onClick={() => onSelect(item.name)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

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

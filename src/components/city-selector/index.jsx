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
  const onAlphabetClick = useCallback((e) => {
    const titleEle = document.querySelector(
      `[data-title=${e.target.getAttribute('data-letter')}]`
    );
    if (titleEle) {
      titleEle.style.position = 'static'; // 若为 fixed，滑动至屏幕上方的项时不会展开其下的城市列表
      titleEle.scrollIntoView();
      titleEle.style = '';
    }
  }, []);

  return (
    <div className='city-selector'>
      <div className='city-block'>
        <div className='title' data-title='定位'>
          定位
        </div>
        <div className='btn-group'>
          <div className='btn-item' onClick={getPos}>
            {currntPos ? currntPos : '定位'}
          </div>
        </div>
      </div>
      <div className='city-block'>
        <div className='title' data-title='热门'>
          热门
        </div>
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
      {/* 城市列表 */}
      {cityList.map((item) => {
        const { citys = [] } = item;
        return (
          <div className='city-block' key={item.title}>
            <div className='title' data-title={item.title}>
              {item.title}
            </div>
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
      {/* 字母表 */}
      <div className='alphabet-block'>
        {['定位', '热门'].map((text) => (
          <button
            onClick={onAlphabetClick}
            className='alphabet-item'
            data-letter={text}
          >
            {text}
          </button>
        ))}
        {Array.from({ length: 26 }).map((_item, index) => {
          const text = String.fromCodePoint(65 + index);
          return (
            <button
              onClick={onAlphabetClick}
              className='alphabet-item'
              data-letter={text}
            >
              {text}
            </button>
          );
        })}
      </div>
    </div>
  );
}

CitySelector.propTypes = {
  cityList: PropTypes.array,
  onSelect: PropTypes.func,
};

export default memo(CitySelector);

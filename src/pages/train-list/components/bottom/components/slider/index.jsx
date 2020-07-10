import React, { memo, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Slider = memo(function Slider(props) {
  const {
    title,
    currentStartHours,
    currentEndHours,
    onStartChanged,
    onEndChanged,
  } = props;

  // 将当前时间换算成百分比的值
  const [start, setStart] = useState(() => (currentStartHours / 24) * 100);
  const [end, setEnd] = useState(() => (currentEndHours / 24) * 100);

  // 防止溢出问题
  const startPercent = useMemo(() => {
    if (start > 100) {
      return 100;
    }
    if (start < 0) {
      return 0;
    }
    return start;
  }, [start]);
  const endPercent = useMemo(() => {
    if (end > 100) {
      return 100;
    }
    if (end < 0) {
      return 0;
    }
    return end;
  }, [end]);

  // 将百分比值转换为 24 进制的
  const startHours = useMemo(() => {
    return Math.round((startPercent * 24) / 100);
  }, [startPercent]);
  const endHours = useMemo(() => {
    return Math.round((endPercent * 24) / 100);
  }, [endPercent]);

  // 获取显示的文案
  const startText = useMemo(() => {
    return startHours.toString().padStart(2, '0') + ':00';
  }, [startHours]);
  const endText = useMemo(() => {
    return endHours.toString().padStart(2, '0') + ':00';
  }, [endHours]);

  return (
    <div className='option'>
      <h3>{title}</h3>
      <div className='range-slider'>
        <div className='slider'>
          <div
            className='slider-range'
            style={{
              left: startPercent + '%',
              width: endPercent - startPercent + '%',
            }}
          ></div>
          <i
            className='slider-handle'
            style={{
              left: startPercent + '%',
            }}
          >
            <span>{startText}</span>
          </i>
          <i
            className='slider-handle'
            style={{
              left: endPercent + '%',
            }}
          >
            <span>{endText}</span>
          </i>
        </div>
      </div>
    </div>
  );
});

Slider.propTypes = {
  title: PropTypes.string.isRequired,
  currentStartHours: PropTypes.number.isRequired,
  currentEndHours: PropTypes.number.isRequired,
  onStartChanged: PropTypes.func.isRequired,
  onEndChanged: PropTypes.func.isRequired,
};

export default Slider;

import React, {
  memo,
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useWinSize } from '../../../../../../lib/hooks';
import './index.scss';

const Slider = memo(function Slider(props) {
  const {
    title,
    currentStartHours,
    currentEndHours,
    onStartChanged,
    onEndChanged,
  } = props;

  const startHandle = useRef();
  const endHandle = useRef();

  const lastStartX = useRef(); // 左侧滑块上一次的横坐标
  const lastEndX = useRef(); // 右侧滑块上一次的横坐标

  const range = useRef();
  const rangeWidth = useRef(); // 记录滑动区域的宽度，当窗口变化时将重新计算

  const winSize = useWinSize();

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

  useEffect(() => {
    rangeWidth.current = parseFloat(
      window.getComputedStyle(range.current).width
    );
  }, [winSize]);

  const onStartTouchBegin = useCallback(function onStartTouchBegin(e) {
    const touch = e.targetTouches[0];
    lastStartX.current = touch.pageX;
  }, []);

  const onEndTouchBegin = useCallback(function onEndTouchBegin(e) {
    const touch = e.targetTouches[0];
    lastEndX.current = touch.pageX;
  }, []);

  const onStartTouchMove = useCallback(function onStartTouchMove(e) {
    const touch = e.targetTouches[0];
    const distance = touch.pageX - lastStartX.current;
    lastStartX.current = touch.pageX;
    setStart((start) => start + (distance / rangeWidth.current) * 100);
  }, []);

  const onEndTouchMove = useCallback(function onEndTouchMove(e) {
    const touch = e.targetTouches[0];
    const distance = touch.pageX - lastEndX.current;
    lastEndX.current = touch.pageX;
    setEnd((end) => end + (distance / rangeWidth.current) * 100);
  }, []);

  // 为滑块绑定事件
  useEffect(() => {
    const startHandleEle = startHandle.current;
    const endHandleEle = endHandle.current;
    startHandleEle.addEventListener('touchstart', onStartTouchBegin);
    startHandleEle.addEventListener('touchmove', onStartTouchMove);
    endHandleEle.addEventListener('touchstart', onEndTouchBegin);
    endHandleEle.addEventListener('touchmove', onEndTouchMove);

    return () => {
      startHandleEle.removeEventListener('touchstart', onStartTouchBegin);
      startHandleEle.removeEventListener('touchmove', onStartTouchMove);
      endHandleEle.removeEventListener('touchstart', onEndTouchBegin);
      endHandleEle.removeEventListener('touchmove', onEndTouchMove);
    };
  });

  // 上报数据变化
  useEffect(() => {
    onStartChanged(startHours);
  }, [onStartChanged, startHours]);
  useEffect(() => {
    onEndChanged(endHours);
  }, [onEndChanged, endHours]);

  return (
    <div className='option'>
      <h3>{title}</h3>
      <div className='range-slider'>
        <div className='slider' ref={range}>
          <div
            className='slider-range'
            style={{
              left: startPercent + '%',
              width: endPercent - startPercent + '%',
            }}
          ></div>
          <i
            ref={startHandle}
            className='slider-handle'
            style={{
              left: startPercent + '%',
            }}
          >
            <span>{startText}</span>
          </i>
          <i
            ref={endHandle}
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

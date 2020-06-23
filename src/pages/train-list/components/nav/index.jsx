import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from '../../../../lib/utils';
import './index.scss';

function Nav({
  time,
  onPrevClick = noop,
  onNextClick = noop,
  isPrevDisabled,
  isNextDisabled,
}) {
  const displayDate = useMemo(() => {
    const date = new Date(time);
    return `${date.toLocaleDateString().split(/\//).slice(-2).join('月')}日`;
  }, [time]);
  const week = useMemo(() => {
    const date = new Date(time);
    return `周${['日', '一', '二', '三', '四', '五', '六'][date.getDay()]}`;
  }, [time]);

  return (
    <div className='nav'>
      <div
        className={classnames('prev', {
          disabled: isPrevDisabled,
        })}
        onClick={onPrevClick}
      >
        前一天
      </div>
      <div className='current-date'>
        {displayDate} {week}
      </div>
      <div
        className={classnames('next', {
          disabled: isNextDisabled,
        })}
        onClick={onNextClick}
      >
        后一天
      </div>
    </div>
  );
}

Nav.propTypes = {
  time: PropTypes.number.isRequired,
  onPrevClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  isPrevDisabled: PropTypes.bool.isRequired,
  isNextDisabled: PropTypes.bool.isRequired,
};

export default memo(Nav);

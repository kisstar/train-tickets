import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function ModalTitle({ ok, cancel, isResetDisabled }) {
  return (
    <div className='title'>
      <span
        className={classnames('reset', {
          disabled: isResetDisabled,
        })}
        onClick={cancel}
      >
        重置
      </span>
      <span className='ok' onClick={ok}>
        确定
      </span>
    </div>
  );
}

ModalTitle.propTypes = {
  ok: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  isResetDisabled: PropTypes.bool.isRequired,
};

export default memo(ModalTitle);

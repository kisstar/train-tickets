import React, { memo } from 'react';
import PropTypes from 'prop-types';

function ModalTitle({ ok, cancel }) {
  return (
    <div className='title'>
      <span className='reset' onClick={cancel}>
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
};

export default memo(ModalTitle);

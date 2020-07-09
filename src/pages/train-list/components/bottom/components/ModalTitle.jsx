import React, { memo } from 'react';
import PropTypes from 'prop-types';

function ModalTitle(props) {
  return (
    <div className='title'>
      <span className='reset'>重置</span>
      <span className='ok'>确定</span>
    </div>
  );
}

ModalTitle.propTypes = {
  ok: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default memo(ModalTitle);

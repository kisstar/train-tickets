import React, { memo } from 'react';

const BottomModal = memo(function BottomModal(props) {
  return (
    <div className='bottom-modal'>
      <div className='bottom-dialog'>
        <div className='bottom-dialog-content'>{props.children}</div>
      </div>
    </div>
  );
});

export default BottomModal;

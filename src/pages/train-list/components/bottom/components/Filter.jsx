import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Filter = memo(function Filter(props) {
  const { name, checked, value, dispatch } = props;

  return (
    <li
      className={classnames({ checked })}
      onClick={() => dispatch({ payload: value, type: 'toggle' })}
    >
      {name}
    </li>
  );
});

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Filter;

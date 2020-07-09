import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Filter = memo(function Filter(props) {
  const { name } = props;

  return <li>{name}</li>;
});

Filter.propTypes = {
  name: PropTypes.string.isRequired,
};

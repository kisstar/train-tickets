import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import './index.scss';

const List = memo(function List(props) {
  const { list } = props;

  return (
    <ul className='list'>
      {list.map((item) => (
        <ListItem {...item} key={item.trainNumber} />
      ))}
    </ul>
  );
});

List.propTypes = {
  list: PropTypes.array.isRequired,
};

export default List;

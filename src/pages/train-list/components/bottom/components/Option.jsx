import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';

const Option = memo(function Option(props) {
  const { title, options, checkedMap, update } = props;

  const toggle = useCallback(
    (value) => {
      const newCheckMap = { ...checkedMap };

      if (value in checkedMap) {
        Reflect.deleteProperty(newCheckMap, value);
      } else {
        newCheckMap[value] = true;
      }

      update(newCheckMap);
    },
    [checkedMap, update]
  );

  return (
    <div className='option'>
      <h3>{title}</h3>
      <ul>
        {options.map((option) => {
          return (
            <Filter
              key={option.value}
              {...option}
              checked={option.value in checkedMap}
              toggle={toggle}
            />
          );
        })}
      </ul>
    </div>
  );
});

Option.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  checkedMap: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
};

export default Option;

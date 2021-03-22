import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { phoneBookSelectors, changeFilter } from '../../redux/phoneBook';
import './Filter.css';

export default function Filter() {
  const dispatch = useDispatch();
  const value = useSelector(phoneBookSelectors.getFilter);

  const onChangeFilter = useCallback(
    event => dispatch(changeFilter(event.target.value)),
    [dispatch],
  );

  return (
    <div className="form">
      <label className="form-label">
        Find contact by name
        <input
          type="text"
          className="form-input"
          value={value}
          onChange={onChangeFilter}
        />
      </label>
    </div>
  );
}
Filter.defaultProps = {
  value: '',
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,

  onChangeFilter: PropTypes.func,
};

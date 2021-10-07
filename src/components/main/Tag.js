import React from 'react';
import PropTypes from 'prop-types';
import {
  loadTaskList,
  delTag,
  loadTagList,
  chosenTag,
  editTag,
  filterByDesc,
} from '../../actions/dashboard';
import { connect } from 'react-redux';

const Tag = ({
  tag: { name, id },
  loadTaskList,
  delTag,
  loadTagList,
  chosenTag,
  editTag,
  filterByDesc,
}) => {
  // const delTagHandler = async (name, id) => {
  //   let taskFilteredByTag = await chosenTag(id);
  //   console.log(taskFilteredByTag);
  // };
  return (
    <li
      onClick={(e) => {
        loadTaskList(name);
      }}
    >
      <p>{name}</p>
      <div>
        {name !== 'priority' && name !== 'normal' && name !== 'important' ? (
          <button
            onClick={(e) => {
              // console.log(id);
              delTag(id);
              loadTagList();
              // delTagHandler(name, id);
            }}
          >
            x
          </button>
        ) : (
          ''
        )}{' '}
        {name !== 'priority' && name !== 'normal' && name !== 'important' ? (
          <i className="fas fa-edit"></i>
        ) : (
          ''
        )}
      </div>
    </li>
  );
};

Tag.propTypes = {
  loadTaskList: PropTypes.func.isRequired,
  delTag: PropTypes.func.isRequired,
  loadTagList: PropTypes.func.isRequired,
  chosenTag: PropTypes.func.isRequired,
  editTag: PropTypes.func.isRequired,
  filterByDesc: PropTypes.func.isRequired,
};

export default connect(null, {
  loadTaskList,
  delTag,
  editTag,
  loadTagList,
  chosenTag,
  filterByDesc,
})(Tag);

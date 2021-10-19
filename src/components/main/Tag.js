import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  loadTaskList,
  delTag,
  loadTagList,
  chosenTag,
  editTag,
  filterByDesc,
  toggleDelForm,
  toggleBackDrop,
} from '../../actions/dashboard';
import { connect } from 'react-redux';

const Tag = ({
  tag,
  loadTaskList,
  delTag,
  toggleDelForm,
  toggleBackDrop,
  loadTagList,
}) => {
  // const delTagHandler = async (name, id) => {
  //   let taskFilteredByTag = await chosenTag(id);
  //   console.log(taskFilteredByTag);
  // };
  return (
    <Fragment>
      <li
        onClick={(e) => {
          loadTaskList(tag.name);
        }}
      >
        <p>{tag.name}</p>
        <div>
          {tag.name !== 'priority' &&
          tag.name !== 'normal' &&
          tag.name !== 'important' ? (
            <button
              onClick={(e) => {
                toggleBackDrop();
                toggleDelForm(true, { type: 'tag', item: tag });
              }}
            >
              x
            </button>
          ) : (
            ''
          )}{' '}
          {tag.name !== 'priority' &&
          tag.name !== 'normal' &&
          tag.name !== 'important' ? (
            <i className="fas fa-edit"></i>
          ) : (
            ''
          )}
        </div>
      </li>
    </Fragment>
  );
};

Tag.propTypes = {
  loadTaskList: PropTypes.func.isRequired,
  delTag: PropTypes.func.isRequired,
  loadTagList: PropTypes.func.isRequired,
  chosenTag: PropTypes.func.isRequired,
  editTag: PropTypes.func.isRequired,
  filterByDesc: PropTypes.func.isRequired,
  toggleDelForm: PropTypes.func.isRequired,
  toggleBackDrop: PropTypes.func.isRequired,
};
const mapStateToProps = ({ dashboard }) => ({
  del_form: dashboard.del_form,
  delItem: dashboard.delItem,
});
export default connect(mapStateToProps, {
  loadTaskList,
  delTag,
  editTag,
  loadTagList,
  chosenTag,
  filterByDesc,
  toggleDelForm,
  toggleBackDrop,
})(Tag);

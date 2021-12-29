import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  loadTaskList,
  delTag,
  loadTagList,
  filterByDesc,
  toggleDelForm,
  toggleBackDrop,
  toggleTagForm,
  toggleEditTagForm,
} from '../../actions/dashboard';
import { connect } from 'react-redux';
/**
 * This child component renders each tag element in the list
 * @param {*} store's props and functions to modify db at actions/dashboard
 * @returns
 */
const Tag = ({
  tag,
  loadTaskList,
  toggleDelForm,
  toggleBackDrop,
  toggleEditTagForm,
}) => {
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
            <button>
              <i
                className="fas fa-edit"
                onClick={(e) => {
                  toggleBackDrop();
                  toggleEditTagForm(tag);
                }}
              ></i>
            </button>
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
  filterByDesc: PropTypes.func.isRequired,
  toggleDelForm: PropTypes.func.isRequired,
  toggleBackDrop: PropTypes.func.isRequired,
  toggleTagForm: PropTypes.func.isRequired,
  toggleEditTagForm: PropTypes.func.isRequired,
};
const mapStateToProps = ({ dashboard }) => ({
  del_form: dashboard.del_form,
  delItem: dashboard.delItem,
});
export default connect(mapStateToProps, {
  loadTaskList,
  delTag,
  loadTagList,
  filterByDesc,
  toggleDelForm,
  toggleBackDrop,
  toggleTagForm,
  toggleEditTagForm,
})(Tag);

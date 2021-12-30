import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tagLoading } from '../../actions/alert';
import {
  toggleDelForm,
  toggleBackDrop,
  loadTagList,
  loadTaskList,
} from '../../actions/dashboard';
import Moment from 'react-moment';
/**
 *
 * This component renders the delete task/tag form
 * User can only delete user-defined tags, system's tag like "normal" "priority" "important" cannot be deleted
 * When user delete tag that contains some tasks inside these will be changed to "normal" tag
 * @params {*} store's props and functions to modify db at actions/dashboard.js
 */
const DelForm = ({
  toggleDelForm,
  toggleBackDrop,
  delItem,
  type,
  tagLoading,
  delFunc,
  tasks,
}) => {
  // check if this is Task deletion
  const [isTask, setIsTask] = useState(type === 'task' ? true : false);
  // check if this is Tag deletion
  const [isTag, setIsTag] = useState(type === 'tag' ? true : false);

  return (
    <div className="tag-form">
      <div className="modal__header">
        <label>⚠️Delete this item⚠️</label>
      </div>
      <div className=" modal__layout">
        <label>❌Action cannot undo❌</label>
        {isTask ? (
          <p
            style={{
              overflowY: 'scroll',
              width: '100%',
              overflowWrap: 'break-word',
              height: '50px',
              fontSize: '15px',
            }}
          >
            {delItem.item.desc},{' '}
            <small>
              created on{' '}
              <Moment format="DD/MM/YYYY hh:mm A">
                {delItem.item.created}
              </Moment>
            </small>
          </p>
        ) : (
          ''
        )}
        {isTag ? (
          <p
            style={{
              overflowY: 'scroll',
              width: '100%',
              overflowWrap: 'break-word',
              height: '50px',
              fontSize: '15px',
            }}
          >
            Delete this <small>{delItem.item.name}</small> means{' '}
            {tasks.filter((e) => e.tag === delItem.item.name).length} (tasks)
            will be changed to normal
          </p>
        ) : (
          ''
        )}
      </div>
      <div className=" modal__actions">
        <button
          className="btn btn-primary"
          onClick={(e) => {
            toggleDelForm(false, null);
            toggleBackDrop();
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={(e) => {
            tagLoading();
            delFunc(delItem.item);
            toggleDelForm(false, null);
            toggleBackDrop();
          }}
        >
          I'm Sure
        </button>
      </div>
    </div>
  );
};
DelForm.propTypes = {
  toggleDelForm: PropTypes.func.isRequired,
  delFunc: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  toggleBackDrop: PropTypes.func.isRequired,
};
const mapStateToProps = ({ dashboard }) => ({
  tag_loading: dashboard.tag_loading,
  del_form: dashboard.del_form,
  delItem: dashboard.delItem,
  tasks: dashboard.tasks,
});
export default connect(mapStateToProps, {
  toggleDelForm,
  toggleBackDrop,
  tagLoading,
})(DelForm);

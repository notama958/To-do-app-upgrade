import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { setLoading } from '../../actions/alert';
import {
  delTask,
  toggleBackDrop,
  toggleTaskForm,
  toggleEditTaskForm,
  setEditTask,
  filterByDesc,
  toggleDelForm,
} from '../../actions/dashboard';
// check if the reminder date is due or not
const checkDate = (d) => {
  return d === null ? false : new Date(d) > new Date() ? false : true;
};
/**
 * This child component renders each Task element
 * @param {*} store's props and functions to modify db at actions/dashboard
 * @returns
 */
const Task = ({
  task,
  toggleBackDrop,
  toggleEditTaskForm,
  toggleDelForm,
  setEditTask,
  setLoading,
}) => {
  const [dueTask, setDueTask] = useState(checkDate(task.alarm)); // hold boolean check for reminder date
  return (
    <Fragment>
      <div
        className={`task-item ${task.status} ${dueTask ? 'due' : ''}`}
        key={task.id}
      >
        <p>
          <b>
            <b className="due-reminder">{dueTask ? '🚨' : ''}</b>
            {'   '}
            {task.desc}
          </b>
          {' - '}
          <small style={{ fontStyle: 'normal' }}>{task.tag}</small>{' '}
          {task.alarm !== null ? <i className="far fa-calendar-alt"></i> : ''}
        </p>
        <div className="control-btns">
          <button
            onClick={(e) => {
              setLoading();
              setEditTask(task);
              // toggle the edit form
              toggleBackDrop();
              toggleEditTaskForm();
            }}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            onClick={(e) => {
              toggleBackDrop();
              //toggle delete form
              toggleDelForm(true, { type: 'task', item: task });
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <small style={{ fontStyle: 'normal' }}>
          Created on <Moment format="DD/MM/YYYY hh:mm A">{task.created}</Moment>
        </small>
        {task.alarm !== null ? (
          <small style={{ fontStyle: 'normal' }}>
            Due on <Moment format="DD/MM/YYYY hh:mm A">{task.alarm}</Moment>
          </small>
        ) : (
          ''
        )}
      </div>
    </Fragment>
  );
};
const mapStateToProps = ({ dashboard }) => ({
  tags: dashboard.tags,
});
Task.propTypes = {
  delTask: PropTypes.func.isRequired,
  toggleBackDrop: PropTypes.func.isRequired,
  toggleTaskForm: PropTypes.func.isRequired,
  toggleDelForm: PropTypes.func.isRequired,
  toggleEditTaskForm: PropTypes.func.isRequired,
  setEditTask: PropTypes.func.isRequired,
  filterByDesc: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  delTask,
  toggleBackDrop,
  toggleTaskForm,
  toggleDelForm,
  setEditTask,
  toggleEditTaskForm,
  filterByDesc,
  setLoading,
})(Task);

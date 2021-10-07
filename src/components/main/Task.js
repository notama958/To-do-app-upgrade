import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Fragment, Link, useRef } from 'react';
import {
  loadTagList,
  loadTaskList,
  addTask,
  delTask,
  toggleBackDrop,
  toggleTaskForm,
  toggleEditTaskForm,
  setEditTask,
} from '../../actions/dashboard';
const Task = ({
  task,
  delTask,
  toggleBackDrop,
  toggleTaskForm,
  toggleEditTaskForm,
  setEditTask,
}) => {
  return (
    <div className={`task-item ${task.status}`} key={task.id}>
      <p>
        <b>{task.desc}</b>
        {' - '}
        {task.tag}{' '}
        {task.alarm !== null ? <i className="far fa-calendar-alt"></i> : ''}
      </p>
      <div className="control-btns">
        <button
          onClick={(e) => {
            setEditTask(task);
            toggleBackDrop();
            toggleEditTaskForm();
          }}
        >
          <i className="fas fa-edit"></i>
        </button>
        <button onClick={(e) => delTask(task.id)}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <small>
        Created on <Moment format="DD/MM/YYYY hh:mm A">{task.created}</Moment>
      </small>
    </div>
  );
};
const mapStateToProps = ({ dashboard }) => ({
  tags: dashboard.tags,
});
Task.propTypes = {
  delTask: PropTypes.func.isRequired,
  toggleBackDrop: PropTypes.func.isRequired,
  toggleTaskForm: PropTypes.func.isRequired,
  toggleEditTaskForm: PropTypes.func.isRequired,
  setEditTask: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  delTask,
  toggleBackDrop,
  toggleTaskForm,
  setEditTask,
  toggleEditTaskForm,
})(Task);

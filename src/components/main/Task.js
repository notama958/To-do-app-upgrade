import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Fragment, Link, useRef } from 'react';
import {
  loadTagList,
  loadTaskList,
  addTask,
  delTask,
  toggleBackDrop,
  toggleTaskForm,
  setEditTask,
} from '../../actions/dashboard';
const Task = ({
  task,
  delTask,
  toggleBackDrop,
  toggleTaskForm,
  setEditTask,
}) => {
  return (
    <div className={`task-item ${task.status}`} key={task.id}>
      <p>{task.desc}</p>
      <div className="control-btns">
        <button
          onClick={(e) => {
            setEditTask(task);
            toggleBackDrop();
            toggleTaskForm();
          }}
        >
          <i className="fas fa-edit"></i>
        </button>
        <button onClick={(e) => delTask(task.id)}>
          <i className="fas fa-times"></i>
        </button>
        <button>
          <i className="far fa-calendar-alt"></i>
        </button>
      </div>
      <small>- {task.created}</small>
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
  setEditTask: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  delTask,
  toggleBackDrop,
  toggleTaskForm,
  setEditTask,
})(Task);

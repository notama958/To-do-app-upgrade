import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Fragment, Link, useRef } from 'react';
import {
  loadTagList,
  loadTaskList,
  addTask,
  delTask,
} from '../../actions/dashboard';
const Task = ({ id, desc, created, status, delTask }) => {
  return (
    <div className={`task-item ${status}`} key={id}>
      <p>{desc}</p>
      <div className="control-btns">
        <button>Edit</button>
        <button onClick={(e) => delTask(id)}>X</button>
        <button>
          <i className="far fa-calendar-alt"></i>
        </button>
      </div>
      <small>- {created}</small>
    </div>
  );
};
const mapStateToProps = ({ dashboard }) => ({
  tags: dashboard.tags,
});
Task.propTypes = {
  delTask: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  delTask,
})(Task);

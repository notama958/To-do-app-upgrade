import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTime } from '../../actions/alert';
import {
  loadTaskList,
  loadTagList,
  toggleBackDrop,
  toggleTaskForm,
  toggleTagForm,
  delTask,
  sortByTime,
  addTask,
} from '../../actions/dashboard';
import Task from './Task';
import Tag from './Tag';
import TaskForm from './TaskForm';
import TagForm from './TagForm';

import { form } from '../layout/form';
import { v4 as uuidv4 } from 'uuid';

const linkStyle = {
  borderRadius: '2rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '0',
  paddingBottom: '0',
  boxShadow: '0 3px #999',
  border: '3px solid white',
  textAlign: 'center',
  itemAlign: 'center',
};
const Dashboard = ({
  local_time,
  setTime,
  tasks,
  tags,
  backdrop,
  task_form,
  tag_form,
  currentTag,
  loadTaskList,
  loadTagList,
  toggleBackDrop,
  toggleTaskForm,
  toggleTagForm,
  delTask,
  addTask,
  sortByTime,
}) => {
  const [enterBar, setEnterBar] = useState('');
  // setTime();
  useEffect(() => {
    loadTaskList(currentTag);
    loadTagList();
    // const interval = setInterval(() => {
    //   setTime();
    // }, 5000);
    // return () => clearInterval(interval);
  }, []);
  const quickAdd = () => {
    if (enterBar !== '') {
      let createdForm = form();
      createdForm.id = uuidv4();
      createdForm.desc = enterBar;
      createdForm.status = 'unchecked';
      createdForm.created = new Date();
      createdForm.tag = currentTag;
      console.log(createdForm);
      addTask(createdForm);
      setEnterBar('');
    }
  };
  return (
    <section id="dashboard">
      <div className="bg-white" id="container-left">
        <div className="menu">
          <a href="/">
            <i
              className="fab fa-optin-monster fa-3x"
              style={{ color: 'black' }}
            ></i>
          </a>
          <h1>To-do list</h1>
          <div className="nav-buttons">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                toggleBackDrop(e);
                toggleTaskForm(e);
              }}
            >
              task +
            </button>
            <Link className="btn btn-success" to="/kanban" style={linkStyle}>
              kanban
            </Link>
          </div>
        </div>
        <div className="menu tags">
          <p className="tags header">
            <i
              className="fas fa-chevron-circle-down"
              style={{ color: 'black' }}
            ></i>{' '}
            Tag ({tags.length})
          </p>
          <button
            className="tags edit"
            onClick={(e) => {
              toggleBackDrop();
              toggleTagForm();
            }}
          >
            +
          </button>
          <button className="tags add" onClick={(e) => loadTaskList('all')}>
            show all
          </button>
          <ul className="dropdown ">
            {tags.map((el) => (
              <Tag key={el.id} tag={el} />
            ))}
            {/* {console.log(tags)} */}
          </ul>
        </div>
      </div>
      <div className="container-right">
        <div className="modal greeting">
          {/* <h1>Hello Master - {local_time}</h1> */}
          <h1>Hello Master - Good Morning</h1>
        </div>
        <div className="modal parent">
          <div className="title">
            <h3>
              {currentTag.charAt(0).toUpperCase() +
                currentTag.slice(1).toLowerCase()}
              {'   '}({tasks.length})
            </h3>
            <div>
              <input
                className="desc-filter"
                placeholder="filter by description"
                type="text"
              />
              <i className="fas fa-filter"></i>{' '}
            </div>
            <i className="fas fa-sort-amount-down">
              <div className="sort-tags">
                <div onClick={(e) => sortByTime('asc', currentTag)}>
                  time a-z
                </div>
                <div onClick={(e) => sortByTime('desc', currentTag)}>
                  time z-a
                </div>
              </div>
            </i>
          </div>

          <div className="task-list">
            {tasks.map((el) => (
              <Task
                id={el.id}
                desc={el.desc}
                created={el.created}
                status={el.status}
                key={el.id}
                tag={el.tag}
                delTask={delTask}
              />
            ))}
            <div className="enter-bar">
              <input
                className="input"
                type="text"
                placeholder="quickly add a task"
                value={enterBar}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    quickAdd();
                  }
                }}
                onChange={(e) => setEnterBar(e.target.value)}
              />
              <i className="far fa-heart" onClick={(e) => quickAdd()}></i>
            </div>
          </div>
        </div>
      </div>
      {backdrop ? <div className="backdrop visible "></div> : ''}
      {/* {tag_form ? <TagForm /> : ''} */}
      {tag_form ? <TagForm /> : ''}
      {task_form ? <TaskForm /> : ''}
    </section>
  );
};
Dashboard.propTypes = {
  setTime: PropTypes.func.isRequired,
  loadTaskList: PropTypes.func.isRequired,
  loadTagList: PropTypes.func.isRequired,
  toggleBackDrop: PropTypes.func.isRequired,
  toggleTaskForm: PropTypes.func.isRequired,
  toggleTagForm: PropTypes.func.isRequired,
  delTask: PropTypes.func.isRequired,
  sortByTime: PropTypes.func.isRequired,
};
const mapStateToProps = ({ dashboard }) => ({
  local_time: dashboard.local_time,
  tasks: dashboard.tasks,
  tags: dashboard.tags,
  backdrop: dashboard.backdrop,
  task_form: dashboard.task_form,
  tag_form: dashboard.tag_form,
  currentTag: dashboard.currentTag,
  addTask: PropTypes.func.isRequired,
});
export default connect(mapStateToProps, {
  setTime,
  loadTaskList,
  loadTagList,
  toggleBackDrop,
  toggleTaskForm,
  delTask,
  sortByTime,
  addTask,
  toggleTagForm,
})(Dashboard);

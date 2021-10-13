import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { form } from '../layout/form';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentTime, Greeting, setLoading } from '../../actions/alert';
import {
  loadTaskList,
  loadTagList,
  toggleBackDrop,
  toggleTaskForm,
  toggleTagForm,
  delTask,
  sortByTime,
  filterByDesc,
  addTask,
} from '../../actions/dashboard';
import Task from './Task';
import Tag from './Tag';
import TaskForm from './TaskForm';
import TagForm from './TagForm';
import EditForm from './EditForm';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
const linkStyle = {
  padding: '0',
  margin: '0',
  // borderRadius: '2rem',
  // paddingLeft: '1rem',
  // paddingRight: '1rem',
  // border: '3px solid white',
  // textAlign: 'center',
  // itemAlign: 'center',
};
const Dashboard = ({
  tasks,
  loading,
  filterTasks,
  tags,
  backdrop,
  task_form,
  tag_form,
  edit_form,
  currentTag,
  loadTaskList,
  loadTagList,
  toggleBackDrop,
  toggleTaskForm,
  toggleTagForm,
  addTask,
  sortByTime,
  filterByDesc,
  setLoading,
}) => {
  const [enterBar, setEnterBar] = useState('');
  const [greeting, updateGreeting] = useState(Greeting());
  const [filterValue, setFilter] = useState('');
  const filterBtn = () => {
    // console.log(filter);
    setLoading();
    filterByDesc(filterValue);
    // setFilterTasks(tasks.filter((e) => e.desc.includes(filterValue)));
  };
  useEffect(() => {
    setLoading();
    loadTaskList(currentTag);
    loadTagList();
    filterByDesc('');
    const interval = setInterval(() => Greeting(), 18000000);
    return () => clearInterval(interval);
  }, []);
  const quickAdd = () => {
    if (enterBar !== '') {
      let createdForm = form();
      createdForm.id = uuidv4();
      createdForm.desc = enterBar;
      createdForm.status = 'unchecked';
      createdForm.created = new Date();
      createdForm.tag = currentTag === 'all' ? 'normal' : currentTag;
      setLoading();
      addTask(createdForm);
      filterByDesc('');
      setEnterBar('');
      currentTag === 'all' ? loadTaskList('all') : loadTaskList(currentTag);
    }
  };
  return (
    <section id="dashboard">
      <div className="bg-white" id="container-left">
        <div className="menu">
          <div id="logo">
            <a href="/">
              <i
                className="fab fa-optin-monster fa-2x"
                style={{ color: 'black' }}
              ></i>
            </a>
            <h1>To-do list</h1>
          </div>
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
            <Link to="/kanban" style={linkStyle}>
              <button className="btn btn-success">kanban</button>
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
          <button
            className="tags add"
            onClick={(e) => {
              setLoading();
              loadTaskList('all');
            }}
          >
            show all
          </button>
          <ul className="dropdown ">
            {loading ? (
              <Spinner />
            ) : (
              tags.map((el) => <Tag key={el.id} tag={el} />)
            )}
            {/* {console.log(tags)} */}
          </ul>
        </div>
      </div>
      <div className="container-right">
        <Alert />
        <div className="modal greeting">
          <h1>Good {greeting} ~ Master ~</h1>
        </div>
        <div className="modal parent">
          <div className="title">
            <h3>
              {currentTag.charAt(0).toUpperCase() +
                currentTag.slice(1).toLowerCase()}
              {'   '}({filterTasks.length})
            </h3>
            <div className="filter">
              <input
                className="desc-filter"
                placeholder="filter by description"
                type="text"
                value={filterValue}
                onChange={(e) => setFilter(e.target.value)}
              />
              <i className="fas fa-filter" onClick={(e) => filterBtn(e)}></i>
            </div>
            <i className="fas fa-sort-amount-down">
              <div className="sort-tags">
                <div
                  onClick={(e) => {
                    setLoading();
                    sortByTime('desc', currentTag);
                  }}
                >
                  time a-z
                </div>
                <div
                  onClick={(e) => {
                    setLoading();
                    sortByTime('asc', currentTag);
                  }}
                >
                  time z-a
                </div>
              </div>
            </i>
          </div>

          <div className="task-list">
            {loading ? (
              <Spinner />
            ) : (
              filterTasks
                .slice(0)
                .reverse()
                .map((el) => <Task task={el} key={el.id} />)
            )}

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
      {edit_form ? <EditForm /> : ''}
    </section>
  );
};
Dashboard.propTypes = {
  loadTaskList: PropTypes.func.isRequired,
  loadTagList: PropTypes.func.isRequired,
  toggleBackDrop: PropTypes.func.isRequired,
  toggleTaskForm: PropTypes.func.isRequired,
  toggleTagForm: PropTypes.func.isRequired,
  delTask: PropTypes.func.isRequired,
  sortByTime: PropTypes.func.isRequired,
  filterByDesc: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
const mapStateToProps = ({ dashboard }) => ({
  local_time: dashboard.local_time,
  tasks: dashboard.tasks,
  filterTasks: dashboard.filterTasks,
  tags: dashboard.tags,
  backdrop: dashboard.backdrop,
  task_form: dashboard.task_form,
  tag_form: dashboard.tag_form,
  currentTag: dashboard.currentTag,
  edit_form: dashboard.edit_form,
  loading: dashboard.loading,
});
export default connect(mapStateToProps, {
  getCurrentTime,
  loadTaskList,
  loadTagList,
  toggleBackDrop,
  toggleTaskForm,
  toggleTagForm,
  delTask,
  sortByTime,
  filterByDesc,
  addTask,
  setLoading,
})(Dashboard);

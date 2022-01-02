import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//actions
import {
  getCurrentTime,
  Greeting,
  tagLoading,
  taskLoading,
} from '../../actions/alert';
import {
  loadTaskList,
  loadTagList,
  toggleBackDrop,
  toggleTaskForm,
  toggleTagForm,
  sortByTime,
  filterByDesc,
  addTask,
  delTag,
  delTask,
} from '../../actions/dashboard';

// components
import { form } from '../layout/form';
import Task from './Task';
import Tag from './Tag';
import TaskForm from './TaskForm';
import TagForm from './TagForm';
import EditForm from './EditForm';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import DelForm from './DelForm';
import EditTagForm from './EditTagForm';
import { loadUser, logout } from '../../actions/auth';
/**
 * Styling object for Kanban button
 */
const linkStyle = {
  padding: '0',
  margin: '0',
};
/**
 * This component is the main activity components
 * User can add/modify/delete/sort,filter,... their tasks
 * @params {*} includes store's props and functions from actions/dashboard.js
 */
const Dashboard = ({
  // effects
  tagLoading,
  taskLoading,
  task_loading,
  tag_loading,
  backdrop,
  toggleBackDrop,
  // Tag related
  tag_form,
  filterTasks,
  tags,
  edit_tag_form,
  currentTag,
  loadTagList,
  toggleTagForm,
  delTag,
  // Task related
  task_form,
  edit_form,
  loadTaskList,
  toggleTaskForm,
  addTask,
  sortByTime,
  filterByDesc,
  del_form,
  delItem,
  delTask,
  //auth
  isAuthenticated,
  user,
  logout,
}) => {
  const [enterBar, setEnterBar] = useState(''); // get the enterBar value
  const [greeting, updateGreeting] = useState(Greeting()); // check the timing <String>
  const [filterValue, setFilter] = useState(''); // get the keyword entered

  useEffect(() => {
    // greeting user based on time "Morning" "Afternoon" "Evening"
    const intervalOne = setInterval(() => Greeting(), 18000000);
    // check authentication and redirect to home page
    const intervalTwo = setInterval(() => {
      if (isAuthenticated && !user) loadUser();
      if (!isAuthenticated) return <Redirect to="/" />;
    }, 5 * 3600 * 1000); // check after 5 hours
    //clear the interval
    return () => {
      clearInterval(intervalOne);
      clearInterval(intervalTwo);
    };
  }, []);

  useEffect(() => {
    // load tag list
    tagLoading();
    loadTagList();
    // load the list corresponds to the currentTag
    taskLoading();
    loadTaskList('all', currentTag, 'desc');
    filterByDesc('');
  }, [loadTagList, filterByDesc]);

  // filter by description function after user click filter icon
  // call task_loading() to render the spinner icons
  // call filterByDesc(<String>) to filter the tasks contain the "keyword"
  const filterBtn = () => {
    taskLoading();
    filterByDesc(filterValue);
  };

  // for the quickly add bar
  const quickAdd = () => {
    if (enterBar !== '') {
      let createdForm = form();
      createdForm.desc = enterBar;
      createdForm.status = 0;
      createdForm.created = new Date();
      createdForm.tagname = currentTag === 'all' ? 'normal' : currentTag;
      createdForm.tag_id =
        currentTag === 'all'
          ? tags.filter((el) => el.tagname === 'normal')[0].tag_id
          : tags.filter((el) => el.tagname === currentTag)[0].tag_id;
      taskLoading();
      addTask(createdForm);
      filterByDesc('');
      setEnterBar('');
      currentTag === 'all'
        ? loadTaskList('all', 'all', 'desc')
        : loadTaskList(
            tags.filter((el) => el.tagname === currentTag)[0].tag_id,
            currentTag,
            'desc'
          );
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
              // load all tasks
              taskLoading();
              loadTaskList('all', 'all', 'desc');
              // load tag list
              tagLoading();
              loadTagList();
            }}
          >
            show all
          </button>
          <ul className="dropdown ">
            {tag_loading ? (
              <Spinner />
            ) : (
              tags.map((el, id) => <Tag key={id} tag={el} />)
            )}
          </ul>
        </div>
      </div>
      <div className="container-right">
        <Alert />
        <div className="navigation-btns">
          <Link to="/profile" className="btn btn-white profile">
            Profile
          </Link>
          <Link onClick={logout} to="#!" className="btn btn-dark">
            <i className="fas fa-sign-out-alt"></i>{' '}
            <span className="hide-sm">Logout</span>
          </Link>
        </div>
        <div className="modal greeting">
          <h1>
            Good {greeting} ~ {user ? user[0].username : 'Master'} ~
          </h1>
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
                onChange={(e) => {
                  //filter tasks by description
                  setFilter(e.target.value);
                  taskLoading();
                  filterByDesc(e.target.value);
                }}
              />
              <i className="fas fa-filter" onClick={(e) => filterBtn(e)}></i>
            </div>
            <i className="fas fa-sort-amount-down">
              <div className="sort-tags">
                <div
                  onClick={(e) => {
                    // A-Z sort by created time
                    taskLoading();
                    sortByTime(
                      (currentTag === 'all') | (currentTag === '')
                        ? currentTag
                        : tags.filter((e) => e.tagname === currentTag)[0]
                            .tag_id,
                      'asc'
                    );
                  }}
                >
                  time a-z
                </div>
                <div
                  onClick={(e) => {
                    // Z-A sort by created time
                    taskLoading();
                    sortByTime(
                      (currentTag === 'all') | (currentTag === '')
                        ? currentTag
                        : tags.filter((e) => e.tagname === currentTag)[0]
                            .tag_id,
                      'desc'
                    );
                  }}
                >
                  time z-a
                </div>
              </div>
            </i>
          </div>

          <div className="task-list">
            {task_loading ? (
              <Spinner />
            ) : (
              // new tag should be added at in beginning in the modal box
              filterTasks.map((el, id) => <Task task={el} key={id} />)
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

      {tag_form ? <TagForm /> : ''}
      {edit_tag_form ? <EditTagForm /> : ''}
      {delItem !== null && delItem.type === 'tag' && del_form ? (
        <DelForm delFunc={(e) => delTag(e)} type="tag" />
      ) : (
        ''
      )}

      {task_form ? <TaskForm /> : ''}
      {edit_form ? <EditForm /> : ''}
      {delItem !== null && delItem.type === 'task' && del_form ? (
        <DelForm delFunc={(e) => delTask(e)} type="task" />
      ) : (
        ''
      )}
    </section>
  );
};
Dashboard.propTypes = {
  loadTaskList: PropTypes.func.isRequired,
  loadTagList: PropTypes.func.isRequired,
  toggleBackDrop: PropTypes.func.isRequired,
  toggleTaskForm: PropTypes.func.isRequired,
  toggleTagForm: PropTypes.func.isRequired,
  sortByTime: PropTypes.func.isRequired,
  filterByDesc: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  delTask: PropTypes.func.isRequired,
  delTag: PropTypes.func.isRequired,
};
const mapStateToProps = ({ dashboard, auth }) => ({
  // effects
  task_loading: dashboard.task_loading,
  tag_loading: dashboard.tag_loading,
  backdrop: dashboard.backdrop,
  //task
  tasks: dashboard.tasks,
  filterTasks: dashboard.filterTasks,
  task_form: dashboard.task_form,
  edit_form: dashboard.edit_form,
  del_form: dashboard.del_form,
  delItem: dashboard.delItem,
  //tag
  tags: dashboard.tags,
  tag_form: dashboard.tag_form,
  currentTag: dashboard.currentTag,
  edit_tag_form: dashboard.edit_tag_form,
  editTag: dashboard.editTag,
  //auth
  isAuthenticated: auth.isAuthenticated,
  auth_loading: auth.loading,
  user: auth.user,
});
export default connect(mapStateToProps, {
  getCurrentTime,
  loadTaskList,
  loadTagList,
  toggleBackDrop,
  toggleTaskForm,
  toggleTagForm,
  delTask,
  delTag,
  sortByTime,
  filterByDesc,
  addTask,
  taskLoading,
  tagLoading,
  logout,
})(Dashboard);

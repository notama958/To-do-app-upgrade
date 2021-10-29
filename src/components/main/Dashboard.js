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
  sortByTime,
  filterByDesc,
  addTask,
  delTag,
  delTask,
} from '../../actions/dashboard';
import Task from './Task';
import Tag from './Tag';
import TaskForm from './TaskForm';
import TagForm from './TagForm';
import EditForm from './EditForm';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import DelForm from './DelForm';
import EditTagForm from './EditTagForm';
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
  loading,
  filterTasks,
  tags,
  backdrop,
  task_form,
  tag_form,
  edit_tag_form,
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
  del_form,
  delItem,
  delTag,
  delTask,
}) => {
  const [enterBar, setEnterBar] = useState(''); // get the enterBar value
  const [greeting, updateGreeting] = useState(Greeting()); // check the timing <String>
  const [filterValue, setFilter] = useState(''); // get the keyword entered
  // filter by description function after user click filter icon
  // call setLoading() to render the spinner icons
  // call filterByDesc(<String>) to filter the tasks contain the "keyword"
  const filterBtn = () => {
    setLoading();
    filterByDesc(filterValue);
  };

  useEffect(() => {
    setLoading(); // render the spinner icons
    loadTaskList(currentTag); // load the list corresponds to the currentTag it is
    // the tag could be "all" "normal" " priority" ,..
    loadTagList(); // load tag list
    filterByDesc(''); // ensure there is no filter by keyword
    const interval = setInterval(() => Greeting(), 18000000);
    // gretting user based on time "Morning" "Afternoon" "Evening"
    return () => clearInterval(interval); // clear the interval
  }, [loadTaskList, loadTagList, filterByDesc]);

  // for the quickly add bar
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
              loadTagList();
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
              // new tag should be added at front in the modal box
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
      {tag_form ? <TagForm /> : ''}
      {edit_tag_form ? <EditTagForm /> : ''}
      {task_form ? <TaskForm /> : ''}
      {edit_form ? <EditForm /> : ''}
      {delItem !== null && delItem.type === 'task' && del_form ? (
        <DelForm delFunc={(e) => delTask(e)} type="task" />
      ) : (
        ''
      )}
      {delItem !== null && delItem.type === 'tag' && del_form ? (
        <DelForm delFunc={(e) => delTag(e)} type="tag" />
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
  setLoading: PropTypes.func.isRequired,
  delTask: PropTypes.func.isRequired,
  delTag: PropTypes.func.isRequired,
};
const mapStateToProps = ({ dashboard }) => ({
  local_time: dashboard.local_time,
  filterTasks: dashboard.filterTasks,
  tags: dashboard.tags,
  backdrop: dashboard.backdrop,
  task_form: dashboard.task_form,
  tag_form: dashboard.tag_form,
  currentTag: dashboard.currentTag,
  edit_form: dashboard.edit_form,
  loading: dashboard.loading,
  del_form: dashboard.del_form,
  delItem: dashboard.delItem,
  edit_tag_form: dashboard.edit_tag_form,
  editTag: dashboard.editTag,
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
  setLoading,
})(Dashboard);

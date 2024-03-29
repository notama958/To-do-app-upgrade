import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { form } from '../layout/form';
//actions
import {
  toggleTaskForm,
  toggleBackDrop,
  addTask,
  loadTaskList,
} from '../../actions/dashboard';
import { getCurrentTime, taskLoading } from '../../actions/alert';
//components
import Spinner from '../layout/Spinner';
import DatePicker from 'react-date-picker';

/**
 * This component renders add new task modal for user add
 * @param {*} store's props and functions to modify db at actions/dashboard
 * @returns
 */
const TaskForm = ({
  tags,
  toggleBackDrop,
  toggleTaskForm,
  addTask,
  loadTaskList,
  taskLoading,
  tag_loading,
}) => {
  const [tagDropDown, setTagDropDown] = useState(false); // tag dropdown selection boolean
  const [chosenTag, setChosenTag] = useState('normal'); // what tag user chooses, default is "normal"
  const [date, setDate] = useState(new Date()); //reminder default date is current date
  const [minute, setMinute] = useState(
    getCurrentTime('time', null).split(':')[1] // get a format of "00"
  );
  const [hour, setHour] = useState(getCurrentTime('time', null).split(':')[0]); // get a format of "00"
  const [done, setDone] = useState(false); //mark as done boolean
  const [alarm, setAlarm] = useState(false); // reminder boolean
  const [desc, setDesc] = useState(''); // hold description from user input
  let taskForm = form(); // create a blank task form
  // create task form
  const setTaskForm = (desc, status, alarm, tag_id, tagname) => {
    taskForm.desc = desc;
    taskForm.status = status;
    taskForm.alarm = alarm;
    taskForm.tag_id = tag_id;
    taskForm.tagname = tagname;
  };

  //submit form
  // first fill the form
  // then render spinner
  // call addTask
  // reload  all tasks available
  const onSubmit = (e) => {
    setTaskForm(
      desc,
      done ? 1 : 0, // in schema it's integer
      alarm
        ? new Date(getCurrentTime('date', date) + ' ' + hour + ':' + minute)
        : null,
      tags.filter((el) => el.tagname === chosenTag)[0].tag_id,
      chosenTag
    );
    taskLoading();
    addTask(taskForm);
    loadTaskList('all', 'all', 'desc');
  };

  return (
    <div className="modal__content ">
      <div className="modal__header">
        <label>
          Mark as done{' '}
          <input
            type="checkbox"
            checked={done}
            onChange={(e) => {
              setDone(!done);
            }}
          />
        </label>
      </div>
      <div className="modal__layout">
        <label>Task</label>
        <input
          type="text"
          name="task-title"
          placeholder="enter your task"
          onChange={(e) => setDesc(e.target.value)}
        />
        <label>Tag</label>
        <div className="tag">
          <input
            type="text"
            name="tag"
            value={chosenTag}
            readOnly={true}
            placeholder="enter new tag"
          />
          {tagDropDown ? (
            <div className="tag-dropdown visible ">
              {tag_loading ? (
                <Spinner />
              ) : (
                tags.map((el, id) => (
                  <li
                    key={id}
                    onClick={(e) => {
                      setChosenTag(el.tagname);
                      setTagDropDown(!tagDropDown);
                    }}
                  >
                    {el.tagname}
                  </li>
                ))
              )}
            </div>
          ) : (
            ''
          )}
          <button
            className="btn btn-dark"
            onClick={(e) => setTagDropDown(!tagDropDown)}
          >
            <i className="fas fa-caret-down"></i>
          </button>
        </div>
      </div>

      <div className="reminder">
        <label>
          Reminder{' '}
          <input
            type="checkbox"
            checked={alarm}
            onChange={(e) => setAlarm(!alarm)}
          />
        </label>
      </div>
      {alarm ? (
        <div className="reminder-visible">
          <DatePicker
            value={date}
            onChange={setDate}
            minDate={new Date()}
            className="calendar"
          />
          <div className="hour-minute">
            <input
              type="number"
              min={0}
              max={23}
              placeholder="hh"
              value={hour}
              onChange={(e) =>
                e.target.value < 24 &&
                e.target.value >= 0 &&
                !isNaN(e.target.value)
                  ? setHour(e.target.value)
                  : alert('Invalid hour input')
              }
            />
            <p>:</p>
            <input
              type="number"
              min={0}
              max={59}
              placeholder="mm"
              value={minute}
              onChange={(e) =>
                e.target.value < 60 &&
                e.target.value >= 0 &&
                !isNaN(e.target.value)
                  ? setMinute(e.target.value)
                  : alert('Invalid minute input')
              }
            />
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="modal__actions">
        <button
          className="btn btn-primary"
          onClick={(e) => {
            toggleTaskForm();
            toggleBackDrop();
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-success"
          onClick={(e) => {
            onSubmit(e);
            toggleTaskForm();
            toggleBackDrop();
          }}
        >
          Save New
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = ({ dashboard }) => ({
  tags: dashboard.tags,
  tag_loading: dashboard.tag_loading,
});
TaskForm.propTypes = {
  toggleBackDrop: PropTypes.func.isRequired,
  toggleTaskForm: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  loadTaskList: PropTypes.func.isRequired,
  taskLoading: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  toggleBackDrop,
  toggleTaskForm,
  addTask,
  loadTaskList,
  taskLoading,
})(TaskForm);

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { form } from '../layout/form';
import {
  toggleTaskForm,
  toggleBackDrop,
  addTask,
  loadTaskList,
} from '../../actions/dashboard';
import { v4 as uuidv4 } from 'uuid';

const TaskForm = ({
  tags,
  toggleBackDrop,
  toggleTaskForm,
  addTask,
  loadTaskList,
}) => {
  const [tagDropDown, setTagDropDown] = useState(false);
  const [chosenTag, setChosenTag] = useState('normal');
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [done, setDone] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [desc, setDesc] = useState('');
  let taskForm = form();
  const setTagForm = (desc, status, alarm, tag) => {
    taskForm.id = uuidv4();
    taskForm.desc = desc;
    taskForm.created = new Date();
    taskForm.status = status;
    taskForm.alarm = alarm;
    taskForm.tag = tag;
  };

  const onSubmit = (e) => {
    //submit form
    // e.preventDefault();
    setTagForm(
      desc,
      done ? 'checked' : 'unchecked',
      hour + minute / 60,
      chosenTag
    );
    // console.log(taskForm);
    addTask(taskForm);
    loadTaskList('all');
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
        <div>
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
                {tags.map((el, id) => (
                  <li
                    key={id}
                    onClick={(e) => {
                      setChosenTag(el['name']);
                      setTagDropDown(!tagDropDown);
                    }}
                  >
                    {el['name']}
                  </li>
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
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
        {alarm ? (
          <div className="visible">
            <input
              type="number"
              min="0"
              className="hour "
              placeholder="hour"
              onChange={(e) => setHour(parseFloat(e.target.value))}
            />
            <input
              type="number"
              min="0"
              className="minute "
              max="60"
              placeholder="minute"
              onChange={(e) => setMinute(parseFloat(e.target.value))}
            />
          </div>
        ) : (
          ''
        )}
      </div>
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
});
TaskForm.propTypes = {
  toggleBackDrop: PropTypes.func.isRequired,
  toggleTaskForm: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  loadTaskList: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  toggleBackDrop,
  toggleTaskForm,
  addTask,
  loadTaskList,
})(TaskForm);

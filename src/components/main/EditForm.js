import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  toggleBackDrop,
  toggleEditTaskForm,
  modifyTask,
} from '../../actions/dashboard';
import { getCurrentTime, setLoading } from '../../actions/alert';
import { form } from '../layout/form';
import Spinner from '../layout/Spinner';

const EditForm = ({
  editTask: { id, desc, tag, created, alarm, status },
  tags,
  toggleBackDrop,
  toggleEditTaskForm,
  setLoading,
  modifyTask,
  loading,
}) => {
  const [done, setDone] = useState(status === 'checked' ? true : false);
  const [tagDropDown, setTagDropDown] = useState(false);
  const [chosenTag, setChosenTag] = useState(tag);
  const [reminder, setReminder] = useState(alarm !== null ? true : false);
  const [date, setDate] = useState(getCurrentTime('date', alarm));
  const [minute, setMinute] = useState(
    alarm !== null ? new Date(alarm).getMinutes() : '00'
  );
  const [hour, setHour] = useState(
    alarm !== null ? new Date(alarm).getHours() : '00'
  );
  const [content, setContent] = useState(desc);
  const onSubmit = () => {
    let taskForm = form();
    taskForm.id = id;
    taskForm.desc = content;
    taskForm.status = done ? 'checked' : 'unchecked';
    taskForm.alarm = reminder
      ? new Date(date + ' ' + hour + ':' + minute)
      : null;
    taskForm.tag = chosenTag;
    taskForm.created = new Date();
    setLoading();
    modifyTask(id, taskForm);
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
              {loading ? (
                <Spinner />
              ) : (
                tags.map((el, id) => (
                  <li
                    key={id}
                    onClick={(e) => {
                      setChosenTag(el['name']);
                      setTagDropDown(!tagDropDown);
                    }}
                  >
                    {el['name']}
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
            checked={reminder}
            onChange={(e) => setReminder(!reminder)}
          />
        </label>
      </div>
      {reminder ? (
        <div className="reminder-visible">
          <input
            type="date"
            min={date}
            value={date}
            className="calendar"
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="hour-minute">
            <input
              type="number"
              min={0}
              max={23}
              placeholder="hour"
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
              placeholder="minute"
              value={minute}
              onChange={(e) =>
                e.target.value < 60 &&
                e.target.value >= 0 &&
                !isNaN(e.target.value)
                  ? setMinute(e.target.value)
                  : alert('Invalid minute input')
              }
            />
          </div>{' '}
        </div>
      ) : (
        ''
      )}
      <div className="modal__actions">
        <button
          className="btn btn-primary"
          onClick={(e) => {
            toggleEditTaskForm();
            toggleBackDrop();
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-success"
          onClick={(e) => {
            onSubmit(e);
            toggleEditTaskForm();
            toggleBackDrop();
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

EditForm.propTypes = {
  toggleBackDrop: PropTypes.func.isRequired,
  toggleEditTaskForm: PropTypes.func.isRequired,
  modifyTask: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
const mapStateToProps = ({ dashboard }) => ({
  tags: dashboard.tags,
  editTask: dashboard.editTask,
  loading: dashboard.loading,
});

export default connect(mapStateToProps, {
  toggleBackDrop,
  toggleEditTaskForm,
  modifyTask,
  setLoading,
})(EditForm);

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  editTask,
  toggleBackDrop,
  toggleEditTaskForm,
} from '../../actions/dashboard';
const EditForm = ({ editTask, tags, toggleBackDrop, toggleEditTaskForm }) => {
  console.log('hasdkjsadk');
  const [done, setDone] = useState(
    editTask.created === 'checked' ? true : false
  );
  const [tagDropDown, setTagDropDown] = useState(false);
  const [chosenTag, setChosenTag] = useState(editTask.tag);
  const [reminder, setReminder] = useState(false);
  const [hour, setHour] = useState(editTask.alarm / 1);
  const [minute, setMinute] = useState((editTask.alarm % 1) * 60);
  const onSubmit = () => {};
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
          value={editTask.desc}
          //   onChange={(e) => setDesc(e.target.value)}
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
            checked={reminder}
            // onChange={(e) => setReminder(!reminder)}
          />
        </label>
        {reminder ? (
          <div className="visible">
            <input
              type="number"
              min="0"
              className="hour "
              placeholder="hour"
              value={hour}
              //   onChange={(e) => setHour(parseFloat(e.target.value))}
            />
            <input
              type="number"
              min="0"
              className="minute "
              max="60"
              placeholder="minute"
              value={minute}
              //   onChange={(e) => setMinute(parseFloat(e.target.value))}
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
            toggleEditTaskForm();
            toggleBackDrop();
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-success"
          onClick={(e) => {
            // onSubmit(e);
            toggleEditTaskForm();
            toggleBackDrop();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

EditForm.propTypes = {
  toggleBackDrop: PropTypes.func.isRequired,
  toggleEditTaskForm: PropTypes.func.isRequired,
};
const mapStateToProps = ({ dashboard }) => ({
  tags: dashboard.tags,
  editTask: dashboard.editTask,
});

export default connect(
  mapStateToProps,
  toggleBackDrop,
  toggleEditTaskForm
)(EditForm);

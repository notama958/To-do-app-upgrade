import React, { useEffect, useState, useCallback } from 'react';
import { Fragment, Link } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTime } from '../../actions/alert';
const Dashboard = ({ local_time, setTime }) => {
  setTime();
  useEffect(() => {
    const interval = setInterval(() => {
      setTime();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
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
            <button className="btn btn-primary">task +</button>
            <button className="btn btn-success">kanban</button>
          </div>
        </div>
        <div className="menu tags">
          <p>
            <i
              className="fas fa-chevron-circle-down"
              style={{ color: 'black' }}
            ></i>{' '}
            List (10)
          </p>
          <button className="tags edit">edit</button>
          <button className="tags add">+</button>
          <ul className="dropdown ">
            <li>dropdowdasdsadsadan sdasdsaddasdasdaasdasddsads</li>
            <li>A</li>
            <li>A</li>
            <li>dropdown true</li>
            <li>A</li>
            <li>A</li>
          </ul>
        </div>
      </div>
      <div className="container-right">
        <div className="modal greeting">
          <h1>Hello Master - {local_time}</h1>
        </div>
        <div className="modal parent">
          <div className="title">
            <h2>All</h2>
            <i className="fas fa-sort-amount-down">
              <div className="sort-tags">
                <div>a-z</div>
                <div>z-a</div>
              </div>
            </i>
          </div>

          <div className="task-list">
            <div className="task-item">
              <p>Do laundry, dodweqqweqwewqewqewqeqweqwsfsdfsdfsdfsdfsd</p>
              <div className="control-btns">
                <button>Edit</button>
                <button>X</button>
                <button>
                  <i className="far fa-calendar-alt"></i>
                </button>
              </div>
              <small> 9am Sunday</small>
            </div>
            <div className="task-item">
              <p>Do laundry, dodweqqweqwewqewqewqeqweqwsfsdfsdfsdfsdfsd</p>
              <div className="control-btns">
                <button>Edit</button>
                <button>X</button>
                <button>
                  <i className="far fa-calendar-alt"></i>
                </button>
              </div>
              <small> 9am Sunday</small>
            </div>

            <div className="task-item">
              <p>Do laundry, do</p>
              <div className="control-btns">
                <button>Edit</button>
                <button>X</button>
                <button>
                  <i className="far fa-calendar-alt"></i>
                </button>
              </div>
              <small>9am Sunday</small>
            </div>
            <div className="task-item">
              <p>Do laundry, do</p>
              <div className="control-btns">
                <button>Edit</button>
                <button>X</button>
                <button>
                  <i className="far fa-calendar-alt"></i>
                </button>
              </div>
              <small>9am Sunday</small>
            </div>
          </div>
          <div className="enter-bar">
            <input
              className="input"
              type="text"
              placeholder="quickly add a task"
            />
            <i className="far fa-heart"></i>
          </div>
        </div>
      </div>
      <div class="backdrop visible "></div>
      <div class="modal__content visible">
        <div class="modal__header">
          <label>
            Mark as done
            <input type="checkbox" checked="checked" />
          </label>
        </div>
        <div class="modal__layout">
          <label>Task</label>
          <input type="text" name="task-title" placeholder="enter your task" />
          <label>Tag</label>
          <div>
            <div class="tag">
              <input type="text" name="tag" placeholder="enter new tag" />
              <div class="tag-dropdown ">
                <li>Priority</li>
                <li>Priority</li>
                <li>Priority</li>
              </div>
            </div>
            <button class="btn btn-dark">
              <i class="fas fa-caret-down"></i>
            </button>
          </div>
        </div>
        <div class="reminder">
          <label>
            Reminder
            <input type="checkbox" checked="checked" />
          </label>
          <div class="visible">
            <input type="number" min="0" class="hour " placeholder="hour" />
            <input
              type="number"
              min="0"
              class="minute "
              max="60"
              placeholder="minute"
            />
          </div>
        </div>
        <div class="modal__actions">
          <button class="btn btn-primary">Cancel</button>
          <button class="btn btn-success">Save New</button>
        </div>
      </div>
    </section>
  );
};
Dashboard.propTypes = {
  setTime: PropTypes.func.isRequired,
};
const mapStateToProps = ({ dashboard }) => ({
  local_time: dashboard.local_time,
});
export default connect(mapStateToProps, { setTime })(Dashboard);

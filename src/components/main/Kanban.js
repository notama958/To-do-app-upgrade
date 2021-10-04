import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
const Kanban = (props) => {
  return (
    <div className="kanban-container">
      <Navbar />
      <section className="kanban">
        <div className="to-do">
          <div className="kanban-header">
            <label>To-do</label>
          </div>
        </div>
        <div className="on-going">
          <div className="kanban-header">
            <label>On-going</label>
          </div>
        </div>
        <div className="completed">
          <div className="kanban-header">
            <label>Completed</label>
          </div>
        </div>
      </section>
    </div>
  );
};

Kanban.propTypes = {};

export default Kanban;

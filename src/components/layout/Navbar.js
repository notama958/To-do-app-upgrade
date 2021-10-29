import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { manualToggle } from '../../actions/alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/**
 *
 * This component render the Navbar layout
 * @params {Function} manualToggle => to toggle the Manual panel
 */

const Navbar = ({ manualToggle }) => {
  const [location, setLocation] = useState(useLocation());
  return (
    <nav className="navbar bg-white">
      <h1>
        <Link to="/">
          <i className="fab fa-optin-monster" style={{ color: `black` }}></i>{' '}
          To-do list
        </Link>
      </h1>
      <ul>
        <li>
          {location.pathname.split('/')[1] !== 'kanban' ? (
            <button
              className="btn btn-white learn-more "
              onClick={(e) => manualToggle(e)}
            >
              Learn more
            </button>
          ) : (
            <Link to="/dashboard">
              <i className="fas fa-arrow-circle-left fa-2x"></i>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
Navbar.propTypes = {
  manualToggle: PropTypes.func.isRequired,
};

export default connect(null, { manualToggle })(Navbar);

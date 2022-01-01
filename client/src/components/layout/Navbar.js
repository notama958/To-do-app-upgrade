import React, { useState, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { manualToggle } from '../../actions/alert';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 *
 * This component renders the Navbar layout
 * @params {Function} manualToggle => to toggle the Manual panel
 * @params {Function} logout => to logout
 * @params {prop} isAuthenticated, loading => to check authentication and renders corresponding components
 *
 */

const Navbar = ({ manualToggle, logout, isAuthenticated, loading }) => {
  const [location, setLocation] = useState(useLocation()); // check location for kanban page
  const authLinks = (
    <ul>
      {location.pathname.split('/')[1] !== 'profile' ? (
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      ) : (
        ''
      )}
      <li>
        <Link onClick={logout} to="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );
  // create link before log in
  const guestLinks = (
    <ul>
      {location.pathname.split('/')[1] === 'register' ? (
        <li>
          <Link to="/login">Login</Link>
        </li>
      ) : location.pathname.split('/')[1] === 'login' ? (
        <li>
          <Link to="/register">register</Link>
        </li>
      ) : (
        ''
      )}
    </ul>
  );
  return (
    <nav className="navbar bg-white">
      <h1>
        <Link to="/">
          <i className="fab fa-optin-monster" style={{ color: `black` }}></i>{' '}
          To-do list
        </Link>
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
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  manualToggle: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  loading: auth.loading,
});
export default connect(mapStateToProps, { manualToggle, logout })(Navbar);

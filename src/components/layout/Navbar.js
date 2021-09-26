import React from 'react';
import { Link } from 'react-router-dom';
import { manualToggle } from '../../actions/alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import '../../css/index.css';

const Navbar = ({ manualToggle }) => {
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
          <button
            className="btn btn-white learn-more "
            onClick={(e) => manualToggle(e)}
          >
            Learn more
          </button>
        </li>
      </ul>
    </nav>
  );
};
Navbar.propTypes = {
  manualToggle: PropTypes.func.isRequired,
};

export default connect(null, { manualToggle })(Navbar);

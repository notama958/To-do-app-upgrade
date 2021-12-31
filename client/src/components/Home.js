import React, { Fragment, useEffect } from 'react';
import Navbar from './layout/Navbar';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Guide from './layout/Guide';
import PropTypes from 'prop-types';

/**
 * This component Home Landing page
 * authenticated user can go to /dashboard, unauthorized/unregistered users need to login/register
 * @param {*} store's props to check authentication and toggle instruction manual
 * @returns
 */
const Home = ({ manual, isAuthenticated }) => {
  return (
    <Fragment>
      <Navbar />
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">TO-DO LIST</h1>
            <p className="lead">Simple note for everyone</p>
            <div className="take-a-note">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-primary">
                  Welcome
                </Link>
              ) : (
                <div className="user-actions">
                  <Link to="/login" className="btn btn-dark login">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-light register">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        {manual ? (
          <div className={`dark-overlay readme `}>
            <div className="landing-inner">
              <Guide />
            </div>
          </div>
        ) : (
          ''
        )}
      </section>
    </Fragment>
  );
};
Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  manual: PropTypes.bool.isRequired,
};
const mapStateToProps = ({ home, auth }) => ({
  manual: home.manual,
  isAuthenticated: auth.isAuthenticated,
});
export default connect(mapStateToProps)(Home);

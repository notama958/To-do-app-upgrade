import React, { Fragment, useEffect } from 'react';
import Navbar from './layout/Navbar';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Guide from './layout/Guide';
import PropTypes from 'prop-types';

/**
 * This component renders the Home page where you can read the manual instruction
 */
const Home = ({ manual, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <Navbar />
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">TO-DO LIST</h1>
            <p className="lead">Simple note for everyone</p>
            <div className="take-a-note">
              {!isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-primary">
                  Welcome
                </Link>
              ) : (
                <div>
                  <Link to="/dashboard" className="btn btn-primary">
                    Login
                  </Link>
                  <Link to="/dashboard" className="btn btn-primary">
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
          console.log(manual)
        )}
      </section>
    </Fragment>
  );
};
Home.propTypes = {
  isAuthenticated: PropTypes.object.isRequired,
  manual: PropTypes.bool.isRequired,
};
const mapStateToProps = ({ home, auth }) => ({
  manual: home.manual,
  isAuthenticated: auth.isAuthenticated,
});
export default connect(mapStateToProps)(Home);

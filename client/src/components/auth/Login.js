import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//actions
import { login } from '../../actions/auth';
//components
import Navbar from '../layout/Navbar';
import Alert from '../layout/Alert';

// This component renders login form
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // assign prop name with prop value
    });
  const onSubmit = (e) => {
    e.preventDefault(); // stop reloading page
    login({ email, password }); // login
  };

  // redirect to dashboard if logged
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <div className="auth-container">
        <Navbar />
        <Alert />
        <div className="auth-box">
          <h1 className="large text-dark">Sign In</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Sign into your Account
          </p>
          {/** Add submit*/}
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                /*call function onChange */
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                /*call function onChange */
                onChange={(e) => onChange(e)}
              />
            </div>

            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
          <p>
            Don't have an account?{' '}
            <Link to="/register">
              <small className="my-1">register</small>
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated, // if stop at auth get full of initState of reducers/auth.js
});

export default connect(mapStateToProps, { login })(Login);

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//actions
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
// components
import Navbar from '../layout/Navbar';
import Alert from '../layout/Alert';

//this component renders register form
const Register = ({ isAuthenticated, register }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const { username, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = (e) => {
    e.preventDefault();
    //password retype check
    if (password !== password2) {
      setAlert('Password not match', 'danger');
    } else {
      register({ username, email, password });
    }
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
          <h1 className="large text-dark">Sign Up</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Create Your Account
          </p>
          {/** Add submit*/}
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                name="username"
                value={username}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
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
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
          </form>
          <p>
            Already have an account?{' '}
            <Link to="/login">
              <small className="my-1">login</small>
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
});
export default connect(mapStateToProps, { register })(Register);

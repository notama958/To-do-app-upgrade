import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//actions
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
// navbar
import Navbar from '../layout/Navbar';
import Alert from '../layout/Alert';
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
    if (password !== password2) {
      // set alert to errors
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
              {/*place name value here */}
              <input
                type="text"
                placeholder="Name"
                name="username"
                /*{name} is formData prop*/
                value={username}
                /*call function onChange */
                onChange={(e) => onChange(e)}
                /*required*/
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                /*call function onChange */
                onChange={(e) => onChange(e)}
                /*required /** need it */
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
                /*minLength="6"*/
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                /*call function onChange */
                onChange={(e) => onChange(e)}
                /*minLength="6"*/
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

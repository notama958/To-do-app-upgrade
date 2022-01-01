import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//components
import Spinner from '../layout/Spinner';
import { Redirect } from 'react-router-dom';
//actions
import { deleteAccount, loadUser, updateAccount } from '../../actions/auth';
import Navbar from '../layout/Navbar';
import { setAlert } from '../../actions/alert';
import Alert from '../layout/Alert';
/**
 * This component renders user profile
 * user can change password/username and delete their accounts
 * @param {*} store's props and functions to modify db at actions/dashboard
 * @returns
 */
const Profile = ({
  isAuthenticated,
  user,
  loading,
  updateAccount,
  deleteAccount,
  loadUser,
}) => {
  const [pwd, setPwd] = useState('');
  const [username, setUsername] = useState('');
  const [changeName, setChangeName] = useState(false);
  const [changepwd, setChangepwd] = useState(false);
  const [changesConfirm, setChangesConfirm] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated && !user) loadUser();
      if (!isAuthenticated) return <Redirect to="/" />;
    }, 5 * 3600 * 1000); // check after 5 hours
    //clear the interval
    return () => {
      clearInterval(interval);
    };
  }, []);

  // check new username/pwd input
  useEffect(() => {
    if (username !== '' || pwd !== '') setChangesConfirm(true);
    else setChangesConfirm(false);
  }, [username, pwd]);

  // redirect to Home
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  // save to changes to account info
  const saveChanges = (e) => {
    const form = {
      username: username,
      password: pwd,
    };
    //save the changes
    updateAccount(form);
  };
  return (
    <Fragment>
      <Navbar />
      <Alert />
      <div id="dashboard">
        {user === null || loading ? (
          <Spinner />
        ) : (
          <div className="profile-container">
            <Link to="/dashboard" className="btn btn-dark back">
              Back to Dashboard
            </Link>
            <div className="profile-title bg-white p-2">
              <h2 className="text-primary">Account Setting</h2>
            </div>
            <div className="bg-white p-2">
              <div className="profile-info email ">
                <p className="">Email</p>
                <small>email cannot be changed</small>
                <input
                  className="profile-input username"
                  value={user[0].email}
                  type={'text'}
                  readOnly
                />
              </div>
              <div className="profile-info">
                <p className="">Username</p>
                <label>
                  <span>
                    <input
                      className={`profile-input username disabled`}
                      value={user[0].username}
                      type={'text'}
                      readOnly
                    />
                    <button
                      className="profile-btn btn "
                      onClick={(e) => {
                        setChangeName(!changeName);
                        if (changeName) setUsername('');
                      }}
                    >
                      change
                    </button>
                  </span>
                </label>

                <label className={`new-info ${changeName ? 'shown' : ''}`}>
                  <small>New username</small>
                  <input
                    className="profile-input username"
                    value={username}
                    placeholder="your new username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="profile-info">
                <label>Password Change</label>
                <label>
                  <small>Current password</small>
                  <span>
                    <input
                      value={user[0].password}
                      type="password"
                      className="disabled"
                      readOnly
                    />
                    <button
                      className="profile-btn btn "
                      onClick={(e) => {
                        setChangepwd(!changepwd);
                        if (changepwd) setPwd('');
                      }}
                    >
                      change
                    </button>
                  </span>
                </label>
                <label className={`new-info ${changepwd ? 'shown' : ''}`}>
                  <small>New password</small>
                  <input
                    className="profile-input password"
                    value={pwd}
                    placeholder="your new password"
                    minLength={6}
                    onChange={(e) => setPwd(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="profile-actions">
                <button
                  className={`btn btn-success ${
                    changesConfirm ? 'active' : ''
                  }`}
                  onClick={(e) => saveChanges(e)}
                >
                  <i className="fas fa-user-plus"></i> Save Changes
                </button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => deleteAccount(e)}
                >
                  <i className="fas fa-user-minus"> </i> Delete account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

Profile.propTypes = {};
const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  loading: auth.loading,
  user: auth.user,
});
export default connect(mapStateToProps, {
  loadUser,
  deleteAccount,
  updateAccount,
})(Profile);

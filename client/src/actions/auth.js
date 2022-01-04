import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  DELETE_PROFILE,
  PROFILE_ERROR,
} from './types';

import { setAlert } from './alert';
import setAuthToken from './set_token';

// get user token and save to local storage
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token); // attach to axios header
  }
  try {
    // use route auth GET
    const res = await axios.get('/api/users');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// register user
export const register =
  ({ username, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ username, email, password });
    try {
      const res = await axios.post('/api/users/register', body, config);
      // response data is user token
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      // load user token to local storage
      // attach the token to any axios request's header
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors && errors instanceof Array) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      } else {
        dispatch({
          type: REGISTER_FAIL,
          payload: 'register failed, please retry again',
        });
        dispatch(setAlert('register failed, please retry again', 'danger'));
      }
    }
  };

// login user
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post('/api/users/login', body, config);
      // reponse data is the user token
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      //load user token to local storage
      // attach the token to any axios request's header
      dispatch(loadUser());
    } catch (err) {
      console.log(err);
      const errors = err.response.data.errors;

      console.log(errors);
      if (errors && errors instanceof Array) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: 'login fail, please retry again',
        });
        dispatch(setAlert('login fail, please retry again', 'danger'));
      }
    }
  };

// logout / clear the profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

//delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? this can NOT be undone')) {
    try {
      await axios.delete(`/api/users/`);
      dispatch({
        type: DELETE_PROFILE,
      });
      dispatch(setAlert('Your account has permanently deleted', 'success'));
    } catch (err) {
      dispatch(setAlert('Cannot delete the account', 'danger'));
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// update user info includes: password, username
export const updateAccount = (userForm) => async (dispatch) => {
  try {
    await axios.put(`/api/users/`, userForm);
    dispatch({
      type: UPDATE_PROFILE,
    });
    dispatch(setAlert('Your new info is saved, thank you', 'success'));
  } catch (err) {
    dispatch(setAlert('Cannot update your account', 'danager'));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

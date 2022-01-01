import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  DELETE_PROFILE,
  UPDATE_PROFILE,
} from '../actions/types';

//authentication redux store's prop
const initState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
};

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    // load user
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    //login successful
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    // login/register fail, delete account, auth error
    case UPDATE_PROFILE:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case DELETE_PROFILE:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload,
        user: null,
      };
    default:
      return state;
  }
}

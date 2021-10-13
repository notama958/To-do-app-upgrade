import {
  SET_ALERT,
  REMOVE_ALERT,
  TOGGLE_MANUAL,
  GET_TIME,
  SET_LOADING,
} from './types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert =
  (msg, alertType, timeout = 6000) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

export const setLoading = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
};
export const manualToggle = () => (dispatch) => {
  dispatch({
    type: TOGGLE_MANUAL,
  });
};
export const getCurrentTime = (label, date) => {
  let currentDate = date === null ? new Date() : new Date(date);

  if (label == 'time') {
    return (
      currentDate.getHours().toString() +
      ':' +
      currentDate.getMinutes().toString()
    );
  } else if (label == 'date') {
    return (
      currentDate.getFullYear() +
      '-' +
      (currentDate.getMonth() + 1 < 10
        ? '0' + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1) +
      '-' +
      (currentDate.getDate() < 10
        ? '0' + currentDate.getDate()
        : currentDate.getDate())
    ).toString();
  }
  return currentDate;
};

export const Greeting = () => {
  const current = new Date();
  const hh = current.getHours();
  if (hh < 12) return 'Morning';
  else if (hh < 18) return 'Afternoon';
  else return 'Evening';
};

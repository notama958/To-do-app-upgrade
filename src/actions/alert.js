import {
  SET_ALERT,
  REMOVE_ALERT,
  TOGGLE_MANUAL,
  GET_TIME,
  SET_LOADING,
} from './types';
import { v4 as uuidv4 } from 'uuid';

// dispatch the alert to store
// sending payload as object type
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

// switch true/false boolean loading
export const setLoading =
  (stt = true) =>
  (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: stt,
    });
  };

// switch true/false boolean manual at home
export const manualToggle = () => (dispatch) => {
  dispatch({
    type: TOGGLE_MANUAL,
  });
};
export const getCurrentTime = (label, date) => {
  let currentDate = date === null ? new Date() : new Date(date);

  // extract the time  format "hh:mm"
  if (label == 'time') {
    return (
      currentDate.getHours().toString() +
      ':' +
      currentDate.getMinutes().toString()
    );
  }
  // extract the time  format "yyyy-mm-dd"
  else if (label == 'date') {
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

// get the greeting based on time
export const Greeting = () => {
  const current = new Date();
  const hh = current.getHours();
  if (hh < 12) return 'Morning';
  else if (hh < 18) return 'Afternoon';
  else return 'Evening';
};

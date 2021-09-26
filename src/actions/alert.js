import { SET_ALERT, REMOVE_ALERT, TOGGLE_MANUAL, GET_TIME } from './types';
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
export const manualToggle = () => (dispatch) => {
  dispatch({
    type: TOGGLE_MANUAL,
  });
};
export const setTime = () => (dispatch) => {
  let currentDate = new Date();
  let tzone = currentDate
    .toString()
    .match(/\(([A-Za-z\s].*)\)/)[1]
    .split(' ')
    .map((substr) => {
      return substr[0].toUpperCase();
    })
    .join('');
  let dtime =
    currentDate.getDate() +
    '/' +
    (currentDate.getMonth() + 1) +
    '/' +
    currentDate.getFullYear() +
    ' ' +
    currentDate.getHours() +
    ':' +
    currentDate.getMinutes() +
    ':' +
    currentDate.getSeconds() +
    ' ' +
    tzone;
  dispatch({
    type: GET_TIME,
    payload: dtime,
  });
};

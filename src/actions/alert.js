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
export const getCurrentTime = (label, date) => {
  let currentDate = date === null ? new Date() : new Date(date);

  if (label == 'time') {
    return currentDate.getHours() + ':' + currentDate.getMinutes() + ':00';
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

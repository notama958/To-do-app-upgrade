import {
  ADD_MANUAL,
  REMOVE_ALERT,
  REMOVE_MANUAL,
  TOGGLE_MANUAL,
} from '../actions/types';

// set alert messages
const initState = { manual: false };
export default function (state = initState, action) {
  const { type } = action;
  switch (type) {
    case TOGGLE_MANUAL:
      return { ...state, manual: !state.manual };
    default:
      return { ...state };
  }
}

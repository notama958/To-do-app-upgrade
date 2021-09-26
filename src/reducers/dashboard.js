import { TOGGLE_MANUAL, GET_TIME } from '../actions/types';

// set alert messages
const initState = { local_time: '', tasks: [], currentTag: 'all', tags: [] };
export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TIME:
      return { ...state, local_time: payload };
    default:
      return { ...state };
  }
}

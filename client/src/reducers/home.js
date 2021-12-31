import { TOGGLE_MANUAL } from '../actions/types';

//home landing page redux store's prop
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

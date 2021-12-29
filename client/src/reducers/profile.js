import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_ALL_PROFILES,
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  error: {}, // if have errors
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: true,
      };
    default:
      return state;
  }
}

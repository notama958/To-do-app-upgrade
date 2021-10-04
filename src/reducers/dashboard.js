import { setChosenTag } from '../actions/dashboard';
import {
  GET_TIME,
  LOAD_TASKS_LIST,
  LOAD_TAGS_LIST,
  TOGGLE_BACKDROP,
  TOGGLE_TASK_FORM,
  TOGGLE_EDIT_TASK_FORM,
  TOGGLE_TAG_FORM,
  SERVER_ERROR,
  ADD_TAG,
  MODIFY_TAG,
  REMOVE_TAG,
  ADD_TASK,
  MODIFY_TASK,
  REMOVE_TASK,
  SORT_LIST,
  TAG_SELECTED,
  EDIT_TASK,
} from '../actions/types';

// set alert messages
const initState = {
  local_time: '',
  tasks: [],
  currentTag: 'all',
  editTask: null,
  tags: [],
  backdrop: false,
  task_form: false,
  edit_form: false,
  tag_form: false,
};
export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_TAGS_LIST:
      return { ...state, tags: [...payload] };
    case LOAD_TASKS_LIST:
      return { ...state, tasks: [...payload], currentTag: 'all' };
    case ADD_TAG:
      return {
        ...state,
        tags: [...state.tags, payload],
      };
    case REMOVE_TAG:
      return {
        ...state,

        tags: state.tags.filter((el) => el.id !== payload),
      };
    case MODIFY_TAG:
      return {
        ...state,
        tags: state.tags.maps((el) => {
          if (el.id === payload.id) {
            return payload;
          }
          return el;
        }),
      };
    case ADD_TASK:
      if (state.currentTag === payload.tag)
        return {
          ...state,
          tasks: [...state.tasks, payload],
        };
      return {
        ...state,
      };
    case MODIFY_TASK:
      if (state.currentTag === payload.tag) {
        return {
          ...state,
          tasks: state.tasks.maps((el) => {
            if (el.id === payload.id) {
              return payload;
            }
            return el;
          }),
        };
      }
      return {
        ...state,
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((el) => el.id !== payload),
      };
    case TAG_SELECTED:
      return {
        ...state,
        tasks: payload.data,
        currentTag: payload.tag,
      };
    case SORT_LIST:
      return { ...state, tasks: payload };
    case EDIT_TASK:
      return { ...state, editTask: payload };
    case GET_TIME:
      return { ...state, local_time: payload };
    case TOGGLE_BACKDROP:
      return { ...state, backdrop: !state.backdrop };
    case TOGGLE_TASK_FORM:
      return { ...state, task_form: !state.task_form };
    case TOGGLE_EDIT_TASK_FORM:
      return { ...state, edit_form: !state.edit_form };
    case TOGGLE_TAG_FORM:
      return { ...state, tag_form: !state.tag_form };
    case SERVER_ERROR:
    default:
      return { ...state };
  }
}

import {
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
  EDIT_TASK,
  FILTER_BY_DESC,
  REMOVE_KEYWORD,
  SET_LOADING,
  TOGGLE_DEL_FORM,
} from '../actions/types';

// set alert messages
const initState = {
  tasks: [],
  currentTag: 'all',
  editTask: null,
  tags: [],
  backdrop: false,
  task_form: false,
  edit_form: false,
  tag_form: false,
  filterTasks: [],
  keyword: '',
  loading: false,
  del_form: false,
  delItem: null,
};
export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_TAGS_LIST:
      return { ...state, tags: [...payload], loading: false };
    case LOAD_TASKS_LIST:
      return {
        ...state,
        tasks: [...payload.data],
        currentTag: payload.tag,
        filterTasks: [...payload.data],
        loading: false,
      };
    case ADD_TAG:
      return {
        ...state,
        tags: [...state.tags, payload],
        loading: false,
      };
    case REMOVE_TAG:
      return {
        ...state,
        tags: state.tags.filter((el) => el.id !== payload),
        loading: false,
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
        loading: false,
      };
    case ADD_TASK:
      if (state.currentTag === payload.tag)
        return {
          ...state,
          tasks: [...state.tasks, payload],
          filterTasks: state.tasks.filter((e) =>
            e.desc.includes(state.keyword)
          ),
          loading: false,
        };
      return {
        ...state,
        loading: false,
      };
    case MODIFY_TASK:
      let arr = state.tasks.filter((el) => el.id !== payload.id);
      arr.push(payload);
      return {
        ...state,
        tasks: arr,
        filterTasks: arr.filter((e) => e.desc.includes(state.keyword)),
        loading: false,
      };

    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((el) => el.id !== payload),
        filterTasks: state.filterTasks.filter((el) => el.id !== payload),
        loading: false,
      };

    case SORT_LIST:
      return {
        ...state,
        tasks: payload.data,
        filterTasks: payload.data.filter((e) => e.desc.includes(state.keyword)),
        loading: false,
      };
    case FILTER_BY_DESC:
      return {
        ...state,
        keyword: payload,
        filterTasks: state.tasks.filter((e) => e.desc.includes(payload)),
        loading: false,
      };

    case EDIT_TASK:
      return { ...state, editTask: payload, loading: false };

    case TOGGLE_BACKDROP:
      return { ...state, backdrop: !state.backdrop };
    case TOGGLE_TASK_FORM:
      return { ...state, task_form: !state.task_form };
    case TOGGLE_EDIT_TASK_FORM:
      return { ...state, edit_form: !state.edit_form };
    case TOGGLE_TAG_FORM:
      return { ...state, tag_form: !state.tag_form };
    case TOGGLE_DEL_FORM:
      return {
        ...state,
        del_form: payload.status,
        delItem: payload.delItem,
      };
    case SET_LOADING:
      return { ...state, loading: payload };
    case SERVER_ERROR:
    default:
      return { ...state };
  }
}

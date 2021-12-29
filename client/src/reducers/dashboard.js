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
  TOGGLE_EDIT_TAG_FORM,
} from '../actions/types';

const initState = {
  tasks: [], // hold task list
  currentTag: 'all', // what tag is selected now ?
  editTask: null, // what task user want to edit?
  editTag: null, // what tag user want to edit?
  tags: [], // hold tag list
  backdrop: false, // back dim screen
  task_form: false, // task form switcher
  edit_form: false, // task edit form switcher
  edit_tag_form: false, // tag edit form switcher
  tag_form: false, // tag form switcher
  filterTasks: [], // filtered task with keyword (default keyword="")
  keyword: '', // keyword for filtering
  loading: false, // spinner switcher
  del_form: false, // delete task form switcher
  delItem: null, // hold deleted task
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
      console.log(state.tags);
      return {
        ...state,
        tags: state.tags.map((el) => {
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
            e.desc.toLowerCase().includes(state.keyword)
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
      let filterByTag = arr.filter((e) => {
        if (state.currentTag === 'all' || state.currentTag === e.tag) return e;
      });
      return {
        ...state,
        tasks: arr,
        filterTasks: filterByTag.filter((e) =>
          e.desc.toLowerCase().includes(state.keyword)
        ),
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
        filterTasks: payload.data.filter((e) =>
          e.desc.toLowerCase().includes(state.keyword)
        ),
        loading: false,
      };
    case FILTER_BY_DESC:
      return {
        ...state,
        keyword: payload,
        filterTasks: state.tasks.filter((e) =>
          e.desc.toLowerCase().includes(payload)
        ),
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
    case TOGGLE_EDIT_TAG_FORM:
      return {
        ...state,
        editTag: payload,
        edit_tag_form: !state.edit_tag_form,
      };
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
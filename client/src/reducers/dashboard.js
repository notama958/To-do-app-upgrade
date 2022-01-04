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
  TASK_LOADING,
  TAG_LOADING,
  TOGGLE_DEL_FORM,
  TOGGLE_EDIT_TAG_FORM,
  TASK_ERROR,
  TAG_ERROR,
  EMPTY_TAGS,
  EMPTY_LIST,
} from '../actions/types';

//dashboard redux store's prop
const initState = {
  tasks: [], // hold task list
  currentTag: 'all', // what tag is selected now ?
  editTask: null, // what task user want to edit?
  editTag: null, // what tag user want to edit?
  tags: [], // hold tag list
  backdrop: false, // background dimmer screen
  task_form: false, // task form switcher
  edit_form: false, // task edit form switcher
  edit_tag_form: false, // tag edit form switcher
  tag_form: false, // tag form switcher
  filterTasks: [], // filtered task with keyword (default keyword="")
  keyword: '', // keyword for filtering
  tag_loading: false, // spinner switcher
  task_loading: false, // spinner switcher
  del_form: false, // delete task form switcher
  delItem: null, // hold deleted task
};
export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_TAGS_LIST:
      return { ...state, tags: [...payload], tag_loading: false };
    case LOAD_TASKS_LIST:
      return {
        ...state,
        tasks: [...payload.data],
        currentTag: payload.tag,
        filterTasks: [...payload.data],
        task_loading: false,
      };
    case ADD_TAG:
      return {
        ...state,
        tags: [...state.tags, payload],
        tag_loading: false,
      };
    case REMOVE_TAG:
      return {
        ...state,
        tags: state.tags.filter((el) => el.tag_id !== payload),
        tag_loading: false,
        currentTag: '',
      };
    case MODIFY_TAG:
      return {
        ...state,
        tags: state.tags.map((el) => {
          if (el.tag_id === payload.tag_id) {
            el.tagname = payload.tagname;
          }
          return el;
        }),
        tasks: state.tasks.map((el) => {
          if (el.tagname === payload.oldtag) {
            el.tagname = payload.tagname;
          }
          return el;
        }),
        tag_loading: false,
        task_loading: false,
        currentTag: payload.tagname,
      };
    case ADD_TASK:
      let sortedTasks = [...state.tasks];
      sortedTasks.push(payload);
      sortedTasks.sort((a, b) => {
        if (a.created > b.created) return -1;
        return 1;
      });
      return {
        ...state,
        tasks: sortedTasks,
        filterTasks: sortedTasks.filter((e) =>
          e.desc.toLowerCase().includes(state.keyword)
        ),
        task_loading: false,
      };

    case MODIFY_TASK:
      let arr = state.tasks.filter((el) => el.task_id !== payload.task_id);
      arr.push(payload);
      arr.sort((a, b) => {
        if (a.created > b.created) return -1;
        return 1;
      });

      return {
        ...state,
        tasks: arr,
        filterTasks: arr.filter((e) =>
          e.desc.toLowerCase().includes(state.keyword)
        ),
        task_loading: false,
        editTask: null, // revert back to null once finished
      };

    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((el) => el.task_id !== payload),
        filterTasks: state.filterTasks.filter((el) => el.task_id !== payload),
        task_loading: false,
      };

    case SORT_LIST:
      return {
        ...state,
        tasks: payload.data,
        filterTasks: payload.data.filter((e) =>
          e.desc.toLowerCase().includes(state.keyword)
        ),
        task_loading: false,
      };
    case FILTER_BY_DESC:
      return {
        ...state,
        keyword: payload,
        filterTasks: state.tasks.filter((e) =>
          e.desc.toLowerCase().includes(payload)
        ),
        task_loading: false,
      };

    case EDIT_TASK: // set edit task
      return { ...state, editTask: payload, task_loading: false };

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
    case TASK_LOADING:
      return { ...state, task_loading: payload };
    case TAG_LOADING:
      return { ...state, tag_loading: payload };
    case EMPTY_LIST:
    case TASK_ERROR:
      return { ...state, task_loading: false };
    case TAG_ERROR:
    case EMPTY_TAGS:
      return { ...state, tag_loading: false };
    case SERVER_ERROR:
    default:
      return { ...state };
  }
}

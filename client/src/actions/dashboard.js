import axios from 'axios';
import { setAlert } from './alert'; // to use setAlert function
import {
  EMPTY_LIST,
  EMPTY_TAGS,
  LOAD_TAGS_LIST,
  LOAD_TASKS_LIST,
  SERVER_ERROR,
  TOGGLE_BACKDROP,
  TOGGLE_TASK_FORM,
  TOGGLE_TAG_FORM,
  ADD_TASK,
  MODIFY_TASK,
  REMOVE_TASK,
  ADD_TAG,
  REMOVE_TAG,
  MODIFY_TAG,
  SORT_LIST,
  FILTER_BY_DESC,
  TOGGLE_EDIT_TASK_FORM,
  TOGGLE_EDIT_TAG_FORM,
  EDIT_TASK,
  TOGGLE_DEL_FORM,
  TASK_ERROR,
  TAG_ERROR,
} from './types';

//------------------------TAG ACTIONS----------------------------//

/** TESTED OKAY
 * GET: tags/
 * desc: get array of tags in json
 *
 */
export const loadTagList = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/tag');
    dispatch({
      type: LOAD_TAGS_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('CANNOT TAGS FROM THE SERVER DB', 'danger'));
    dispatch({
      type: EMPTY_TAGS,
      payload: {
        msg: 'not found',
        status: 404,
      },
    });
  }
};

/**
 * PUT: /api/tag/${id}
 * desc: edit the tag in tags list
 * body: request body includes {"tagname":"XXXX"}
 * params: id (tag_id)
 */
export const modifyTag = (id, newtagData) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/tag/${id}`, newtagData);
    dispatch({
      type: MODIFY_TAG,
      payload: { tag_id: id, tagname: newtagData.tagname },
    });
    dispatch(setAlert('TAG MODIFED', 'success'));
  } catch (err) {
    console.log(err);
    dispatch(setAlert('CANNOT MODIFY TAG', 'danger'));
    dispatch({
      type: TAG_ERROR, // stop spinner loading
    });
  }
};
/** TESTED OKAY
 * GET: POST/
 * desc: add a new tag to the tags list
 * body: request body includes { "tagname": "XXXX"}
 */
export const addTag = (tag) => async (dispatch) => {
  try {
    const res = await axios.post('/api/tag', tag);
    dispatch({
      type: ADD_TAG,
      payload: res.data,
    });
    dispatch(setAlert('TAG ADDED', 'success'));
  } catch (err) {
    dispatch(setAlert('CANNOT ADD TAG', 'danger'));
    dispatch({
      type: TAG_ERROR, // stop spinner loading
    });
  }
};

/** TESTED OKAY
 * DELETE: api/tag/${id}
 * desc: remove one tag from tags list
 * params: id (tag_id)
 */
export const delTag =
  ({ tag_id, tagname }) =>
  async (dispatch) => {
    try {
      const res = await axios.delete(`api/tag/${tag_id}`);
      dispatch({
        type: REMOVE_TAG,
        payload: tag_id,
      });
      dispatch(setAlert('TAG REMOVED', 'success'));
    } catch (err) {
      dispatch(setAlert('CANNOT DELETE TAG', 'danger'));
      dispatch({
        type: TAG_ERROR, // stop spinner loading
      });
    }
  };
//------------------------TASK ACTIONS----------------------------//
/** TESTED OKAY
 * GET: list/?tag=${tag}
 * desc: get array of tasks (can be use to filter task by tag name)
 * body: request body includes {"tag_id":"XXXX","order":"asc|desc"}
 */
export const loadTaskList = (tagid, tagname, order) => async (dispatch) => {
  try {
    const res =
      tagid !== 'all' || tagid === ''
        ? await axios.get(`/api/list?tag_id=${tagid}&order=${order}`)
        : await axios.get(`/api/list/me?order=${order}`);

    dispatch({
      type: LOAD_TASKS_LIST,
      payload: {
        tag: tagid === 'all' || tagid === '' ? 'all' : tagname,
        data: res.data,
      },
    });
  } catch (err) {
    dispatch(setAlert('CANNOT FETCH FROM THE SERVER DB', 'danger'));
    dispatch({
      type: EMPTY_LIST,
      payload: {
        msg: 'not found',
        status: 404,
      },
    });
  }
};

/**
 * POST: list/
 * desc: add new task to list
 *
 */
export const addTask = (taskForm) => async (dispatch) => {
  try {
    let newTaskForm = Object.assign({}, taskForm);
    delete taskForm.tagname;
    delete newTaskForm.tag_id;
    const res = await axios.post('/api/list', taskForm);
    dispatch({
      type: ADD_TASK,
      payload: newTaskForm,
    });
    dispatch(setAlert('TASK ADDED', 'success'));
  } catch (err) {
    console.log(err);
    dispatch(setAlert('CANNOT ADD TASK', 'danger'));
    dispatch({
      type: TASK_ERROR, // stop spinner loading
    });
  }
};

/**
 * PATCH: list/${id}
 * desc: modify a task in list
 *
 */
export const modifyTask = (taskForm) => async (dispatch) => {
  try {
    let newTaskForm = Object.assign({}, taskForm);
    delete taskForm.tagname;
    delete newTaskForm.tag_id;
    const res = await axios.put(`/api/list`, taskForm);
    dispatch({
      type: MODIFY_TASK,
      payload: newTaskForm,
    });
    dispatch(setAlert('TASK MODIFIED', 'success'));
  } catch (err) {
    dispatch(setAlert('CANNOT EDIT TASK', 'danger'));
    dispatch({
      type: TASK_ERROR, // stop spinner loading
    });
  }
};
/**
 * DELETE: list/${id}
 * desc: remove task from list
 *
 */
export const delTask =
  ({ task_id }) =>
  async (dispatch) => {
    try {
      const res = await axios.delete(`/api/list/${task_id}`);
      dispatch({
        type: REMOVE_TASK,
        payload: task_id,
      });
      dispatch(setAlert('TASK REMOVED', 'success'));
    } catch (err) {
      dispatch(setAlert('CANNOT DELETE TASK', 'danger'));
      dispatch({
        type: TASK_ERROR, // stop spinner loading
      });
    }
  };

/**
 * GET: list?tag=<tag_name>&_sort=created&order=${order}
 * desc: sort the current list in the modal view ( perhaps it's viewing in tag group)
 * by created time A-Z or Z-A
 *
 */
export const sortByTime = (tagid, order) => async (dispatch) => {
  try {
    // console.log(tag);
    const res =
      tagid !== 'all'
        ? await axios.get(`/api/list?tag_id=${tagid}&order=${order}`)
        : await axios.get(`/api/list/me?order=${order}`);

    dispatch({
      type: SORT_LIST,
      payload: { data: res.data, order: order },
    });
    dispatch(setAlert('Sorted', 'success'));
  } catch (err) {
    dispatch(setAlert('FAILED TO SORT', 'danger'));
    dispatch({
      type: TASK_ERROR, // stop spinner loading
    });
  }
};
// filter the task list with keyword input
export const filterByDesc = (pattern) => (dispatch) => {
  dispatch({
    type: FILTER_BY_DESC,
    payload: pattern.toLowerCase(),
  });
};
//  save the task need to be edit to store
export const setEditTask = (task) => (dispatch) => {
  dispatch({
    type: EDIT_TASK,
    payload: task,
  });
};
// switch true/false backdrop
export const toggleBackDrop = () => (dispatch) => {
  dispatch({
    type: TOGGLE_BACKDROP,
  });
};
// switch true/false task_form
export const toggleTaskForm = () => (dispatch) => {
  dispatch({
    type: TOGGLE_TASK_FORM,
  });
};
// switch true/false edit_form
export const toggleEditTaskForm = () => (dispatch) => {
  dispatch({
    type: TOGGLE_EDIT_TASK_FORM,
  });
};
// switch true/false edit_tag_form
export const toggleEditTagForm = (tag) => (dispatch) => {
  dispatch({
    type: TOGGLE_EDIT_TAG_FORM,
    payload: tag,
  });
};
// switch true/false tag_form
export const toggleTagForm = () => (dispatch) => {
  dispatch({
    type: TOGGLE_TAG_FORM,
  });
};
// switch true/false del_form
export const toggleDelForm = (status, delItem) => (dispatch) => {
  dispatch({
    type: TOGGLE_DEL_FORM,
    payload: { status: status, delItem: delItem },
  });
};

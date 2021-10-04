import axios from 'axios';
import { setAlert } from './alert';
import {
  EMPTY_LIST,
  EMPTY_TAGS,
  LOAD_TAGS_LIST,
  LOAD_TASKS_LIST,
  SERVER_ERROR,
  TAG_SELECTED,
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
  TOGGLE_EDIT_TASK_FORM,
  EDIT_TASK,
} from './types';
/**
 * GET: /all
 * desc: get array of tasks in json
 *
 */
export const loadTaskList = (tag) => async (dispatch) => {
  try {
    let res;
    if (tag !== 'all') res = await axios.get(`list?tag=${tag}`);
    else res = await axios.get('list');
    dispatch({
      type: LOAD_TASKS_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('CANNOT FETCH FROM THE SERVER DB'));
    dispatch({
      type: EMPTY_LIST,
      payload: {
        msg: 'not found',
        status: 404,
      },
    });
  }
};
export const loadTagList = () => async (dispatch) => {
  try {
    const res = await axios.get('tags');
    // const tagSet = new Set();
    // res.data.forEach((element) => {
    //   tagSet.add(element.tag);
    // });
    dispatch({
      type: LOAD_TAGS_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('CANNOT FETCH FROM THE SERVER DB'));
    dispatch({
      type: EMPTY_TAGS,
      payload: {
        msg: 'not found',
        status: 404,
      },
    });
  }
};

// modify tag
export const editTag = (id, tagData) => async (dispatch) => {
  try {
    const res = await axios.put(`tags/${id}`, tagData);
    dispatch({
      type: MODIFY_TAG,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('CANNOT MODIFY TAG'));
    dispatch({
      type: SERVER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
// add tag: JSON with empty data array
export const addTag = (tag) => async (dispatch) => {
  try {
    const res = await axios.post('tags', tag);
    dispatch({
      type: ADD_TAG,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('CANNOT ADD TAG'));
    dispatch({
      type: SERVER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
// delete tag:
export const delTag = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`tags/${id}`);
    dispatch({
      type: REMOVE_TASK,
      payload: id,
    });
  } catch (err) {
    dispatch(setAlert('CANNOT DELETE TAG'));
    dispatch({
      type: SERVER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//add tag
export const addTask = (taskForm) => async (dispatch) => {
  try {
    console.log(taskForm);
    const res = await axios.post('list', taskForm);
    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('CANNOT ADD TASK'));
    console.log(err);
    dispatch({
      type: SERVER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
//edit task
export const editTask = (id, taskForm) => async (dispatch) => {
  try {
    const res = await axios.put(`list/${id}`, taskForm);
    dispatch({
      type: MODIFY_TASK,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('CANNOT EDIT TASK'));
    dispatch({
      type: SERVER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
//delete task
export const delTask = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`list/${id}`);
    dispatch({
      type: REMOVE_TASK,
      payload: id,
    });
  } catch (err) {
    dispatch(setAlert('CANNOT DELETE TASK'));
    dispatch({
      type: SERVER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
export const setEditTask = (task) => (dispatch) => {
  dispatch({
    type: EDIT_TASK,
    payload: task,
  });
};
//
export const chosenTag = async (tag) => {
  try {
    const res = await axios.get(`list?tag=${tag}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const setChosenTag = (tag) => async (dispatch) => {
  try {
    const res = await axios.get(`list?tag=${tag}`);
    dispatch({
      type: TAG_SELECTED,
      payload: { tag: tag, data: res.data },
    });
  } catch (err) {
    dispatch(setAlert('CANNOT SET TAG'));
    console.log(err);
    dispatch({
      type: SERVER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const sortByTime = (order, tag) => async (dispatch) => {
  try {
    // console.log(tag);
    const res =
      tag !== 'all'
        ? await axios.get(`list?tag=${tag}&_sort=created&_order=${order}`)
        : await axios.get(`list?_sort=created&_order=${order}`);
    // if (tag !== 'all')
    //   res = await axios.get(`list?tag=${tag}_sort=created&_order=${order}`);
    // else res = await axios.get(`list?_sort=created&_order=${order}`);
    dispatch({
      type: SORT_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('SERVER ERROR'));
    dispatch({
      type: SERVER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const toggleBackDrop = () => (dispatch) => {
  dispatch({
    type: TOGGLE_BACKDROP,
  });
};
export const toggleTaskForm = () => (dispatch) => {
  dispatch({
    type: TOGGLE_TASK_FORM,
  });
};
export const toggleEditTaskForm = () => (dispatch) => {
  dispatch({
    type: TOGGLE_EDIT_TASK_FORM,
  });
};
export const toggleTagForm = () => (dispatch) => {
  dispatch({
    type: TOGGLE_TAG_FORM,
  });
};

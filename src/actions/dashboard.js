import axios from 'axios';
import { setAlert } from './alert';
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
  REMOVE_KEYWORD,
  TOGGLE_DEL_FORM,
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
      payload: { tag: tag, data: res.data },
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
    dispatch(setAlert('CANNOT FETCH FROM THE SERVER DB', 'danger'));
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
export const modifyTag = (id, newtagData, oldtagData) => async (dispatch) => {
  try {
    let beforeTagChanged = await axios.get(`list?tag=${oldtagData.name}`);
    beforeTagChanged = beforeTagChanged.data;
    const res = await axios.put(`tags/${id}`, newtagData);
    (async function changing() {
      await Promise.all(
        beforeTagChanged.map(async (t) => {
          const newObj = { id: t.id, tag: newtagData.name };
          try {
            const modifiedTask = await axios.patch(`list/${t.id}`, newObj);
          } catch (err) {
            dispatch(setAlert('SOMETHING WRONG', 'danger'));
            dispatch({
              type: SERVER_ERROR,
              payload: {
                msg: err.response.statusText,
                status: err.response.status,
              },
            });
          }
        })
      ).then((e) => console.log('finished modify tag'));
    })();
    dispatch({
      type: MODIFY_TAG,
      payload: res.data,
    });
    dispatch(setAlert('TAG MODIFED', 'success'));
  } catch (err) {
    console.log(err);
    dispatch(setAlert('CANNOT MODIFY TAG', 'danger'));
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
    dispatch(setAlert('TAG ADDED', 'success'));
  } catch (err) {
    dispatch(setAlert('CANNOT ADD TAG', 'danger'));
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
export const delTag =
  ({ id, name }) =>
  async (dispatch) => {
    try {
      let beforeTagChanged = await axios.get(`list?tag=${name}`);
      beforeTagChanged = beforeTagChanged.data;
      console.log(beforeTagChanged);
      const res = await axios.delete(`tags/${id}`);
      dispatch({
        type: REMOVE_TAG,
        payload: id,
      });
      (async function changing() {
        await Promise.all(
          beforeTagChanged.map(async (t) => {
            const newObj = { id: t.id, tag: 'normal' };
            try {
              const modifiedTask = await axios.patch(`list/${t.id}`, newObj);
            } catch (err) {
              dispatch(setAlert('SOMETHING WRONG', 'danger'));
              dispatch({
                type: SERVER_ERROR,
                payload: {
                  msg: err.response.statusText,
                  status: err.response.status,
                },
              });
            }
          })
        ).then((e) => console.log('finished modify tag'));
      })();
      dispatch(setAlert('TAG REMOVED', 'success'));
    } catch (err) {
      dispatch(setAlert('CANNOT DELETE TAG', 'danger'));
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
    // console.log(taskForm);
    const res = await axios.post('list', taskForm);
    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });
    dispatch(setAlert('Added Task', 'success'));
  } catch (err) {
    dispatch(setAlert('CANNOT ADD TASK', 'danger'));
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
export const modifyTask = (id, taskForm) => async (dispatch) => {
  try {
    const res = await axios.patch(`list/${id}`, taskForm);
    dispatch({
      type: MODIFY_TASK,
      payload: res.data,
    });
    dispatch(setAlert('Modified Task', 'success'));
  } catch (err) {
    dispatch(setAlert('CANNOT EDIT TASK', 'danger'));
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
export const delTask =
  ({ id }) =>
  async (dispatch) => {
    try {
      const res = await axios.delete(`list/${id}`);
      dispatch({
        type: REMOVE_TASK,
        payload: id,
      });
      dispatch(setAlert('Removed Task', 'success'));
    } catch (err) {
      dispatch(setAlert('CANNOT DELETE TASK', 'danger'));
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
      payload: { data: res.data, order: order },
    });
    dispatch(setAlert('Sorted', 'success'));
  } catch (err) {
    dispatch(setAlert('SERVER ERROR', 'danger'));
    dispatch({
      type: SERVER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
export const filterByDesc = (pattern) => (dispatch) => {
  dispatch({
    type: FILTER_BY_DESC,
    payload: pattern,
  });
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
export const toggleEditTagForm = (tag) => (dispatch) => {
  dispatch({
    type: TOGGLE_EDIT_TAG_FORM,
    payload: tag,
  });
};
export const toggleTagForm = () => (dispatch) => {
  dispatch({
    type: TOGGLE_TAG_FORM,
  });
};
export const toggleDelForm = (status, delItem) => (dispatch) => {
  dispatch({
    type: TOGGLE_DEL_FORM,
    payload: { status: status, delItem: delItem },
  });
};

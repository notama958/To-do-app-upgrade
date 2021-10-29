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
} from './types';

/**
 * GET: tags/
 * desc: get array of tags in json
 *
 */
export const loadTagList = () => async (dispatch) => {
  try {
    const res = await axios.get('tags');

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

/**
 * PUT: tags/${id}
 * desc: edit the tag in tags list and modify every task using this tag
 * this might drop the connection to the db sometimes
 */
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
/**
 * GET: POST/
 * desc: add a new tag to the tags list
 *
 */
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
/**
 * DELETE: tags/${id}
 * desc: remove one tag from tags list and modify any task using this tag
 * this might drop the connection to the db sometimes
 */
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

/**
 * GET: list/?tag=${tag}
 * desc: get array of tasks (can be use to filter task by tag name) in json
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
/**
 * POST: list/
 * desc: add new task to list
 *
 */
export const addTask = (taskForm) => async (dispatch) => {
  try {
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
/**
 * PATCH: list/${id}
 * desc: modify a task in list
 *
 */
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
/**
 * DELETE: list/${id}
 * desc: remove task from list
 *
 */
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
// * desc: save the task need to be edit to store
export const setEditTask = (task) => (dispatch) => {
  dispatch({
    type: EDIT_TASK,
    payload: task,
  });
};
/**
 * GET: list?tag=<tag_name>&_sort=created&order=${order}
 * desc: sort the current list in the modal view ( perhaps it's viewing in tag group)
 * by created time A-Z or Z-A
 *
 */
export const sortByTime = (order, tag) => async (dispatch) => {
  try {
    // console.log(tag);
    const res =
      tag !== 'all'
        ? await axios.get(`list?tag=${tag}&_sort=created&_order=${order}`)
        : await axios.get(`list?_sort=created&_order=${order}`);

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
// filter the task list with keyword input
export const filterByDesc = (pattern) => (dispatch) => {
  dispatch({
    type: FILTER_BY_DESC,
    payload: pattern.toLowerCase(),
  });
};
// switch true/fasle backdrop
export const toggleBackDrop = () => (dispatch) => {
  dispatch({
    type: TOGGLE_BACKDROP,
  });
};
// switch true/fasle task_form
export const toggleTaskForm = () => (dispatch) => {
  dispatch({
    type: TOGGLE_TASK_FORM,
  });
};
// switch true/fasle edit_form
export const toggleEditTaskForm = () => (dispatch) => {
  dispatch({
    type: TOGGLE_EDIT_TASK_FORM,
  });
};
// switch true/fasle edit_tag_form
export const toggleEditTagForm = (tag) => (dispatch) => {
  dispatch({
    type: TOGGLE_EDIT_TAG_FORM,
    payload: tag,
  });
};
// switch true/fasle tag_form
export const toggleTagForm = () => (dispatch) => {
  dispatch({
    type: TOGGLE_TAG_FORM,
  });
};
// switch true/fasle del_form
export const toggleDelForm = (status, delItem) => (dispatch) => {
  dispatch({
    type: TOGGLE_DEL_FORM,
    payload: { status: status, delItem: delItem },
  });
};

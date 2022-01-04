const db = require('./knex.js');

/**
 * Tag relation
 */
const addTag = (tag) => {
  // insert and return the insert object
  return db('tag').insert(tag);
};

const modifyTag = (tag, tag_id) => {
  return db('tag').where({ tag_id: tag_id }).update(tag);
};
// returning is needed for psql
const delTag = (id) => {
  return db('tag').where('tag_id', id).returning('tag_id').del();
};
const getTagByName = (tagname) => {
  return db('tag').where('tagname', tagname).select();
};
const getTagById = (tag_id) => {
  return db('tag').where('tag_id', tag_id).select();
};

/**
 * Task relation
 */
const addTask = (task) => {
  return db('list').insert(task);
};
const modifyTask = (task, task_id) => {
  return db('list').where({ task_id, task_id }).update(task, '*');
};
const delTask = (id) => {
  return db('list').where('task_id', id).del();
};

/**
 * User relation
 */
const userRegister = (user) => {
  return db('user').insert(user);
};
const userLogin = (email, pwd) => {
  return db('user').where('email', email).select();
};
const getUserById = (user_id) => {
  return db('user').where('user_id', user_id).select();
};
const getUserbyEmail = (email) => {
  return db('user').where('email', email).select();
};
// delete user
// returning is needed for psql
const removeUser = (user_id) => {
  return db('user').where('user_id', user_id).returning(user_id).del();
};
//update username
const updateUserName = (user_id, username) => {
  return db('user').where('user_id', user_id).update({ username: username });
};
//update password
const updatePassword = (user_id, password) => {
  return db('user').where('user_id', user_id).update({ password: password });
};

// load tasks belong to user
const getList = (user_id, order) => {
  return db('list')
    .join('tag', 'tag.tag_id', '=', 'list.tag_id')
    .where('list.user_id', user_id)
    .select(
      'list.task_id',
      'list.desc',
      'list.status',
      'list.created',
      'list.alarm',
      'list.user_id',
      'tag.tagname'
    )
    .orderBy('list.created', order);
};
//
// load tag belongs to user
// there are 3 default tags made by the system
// priority, important, normal with null owner_id
const getTag = (owner_id) => {
  return db('tag')
    .select('tag_id', 'tagname')
    .where({ owner_id: owner_id })
    .orWhere({ owner_id: null });
};

// filtered task list with
// user_id
// tag_id
// order by created time
const sortByTime = (order, tag_id, user_id) => {
  // order is asc or desc
  return db('list')
    .join('tag', 'tag.tag_id', '=', 'list.tag_id')
    .where({ 'list.user_id': user_id, 'list.tag_id': tag_id })
    .select(
      'list.task_id',
      'list.desc',
      'list.status',
      'list.created',
      'list.alarm',
      'list.user_id',
      'tag.tagname'
    )
    .orderBy('list.created', order);
};
// this is for testing only
const getUser = () => {
  return db.select().from('user');
};
// get one task by id
const getTaskById = (task_id) => {
  return db('list').where('task_id', task_id).select();
};
// this is for testing only
const getAllTasks = () => {
  return db('list').select();
};
// this is for testing only
const getAllTags = () => {
  return db('tag').select();
};
// this is for testing only
const getAllUser = () => {
  return db('user').select();
};
module.exports = {
  addTag,
  modifyTag,
  delTag,
  getTagByName,
  getTagById,
  addTask,
  modifyTask,
  delTask,
  userRegister,
  userLogin,
  removeUser,
  updateUserName,
  updatePassword,
  getList,
  getTag,
  getUser,
  getUserById,
  getUserbyEmail,
  sortByTime,
  getTaskById,
  getAllTasks,
  getAllTags,
  getAllUser,
};

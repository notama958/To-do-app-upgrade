const express = require('express');
const router = express.Router();
const db = require('../sql/db-config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const faker = require('faker');

// TESTED OKAY
/**
 * @route    GET list/me?order
 * @desc     get task list for a user
 * @access    private
 */
router.get('/me', auth, async (req, res) => {
  try {
    const tasks = await db.getList(
      req.user.id,
      req.query.order ? req.query.order : 'desc'
    );
    return res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'something went wrong here',
    });
  }
});

// TESTED OKAY
/**
 * @route    POST list/
 * @desc     add a task into list for a user
 * @access    private
 */
router.post(
  '/',
  [
    auth,
    [
      check('desc', 'Description cannot be empty').not().isEmpty(),
      check('status', 'Status is empty').not().isEmpty(),
      check('created', 'Created time is empty').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { desc, status, created, alarm, tag_id } = req.body;
    const taskObj = {
      task_id: faker.datatype.number({
        min: 10000,
        max: 99999,
      }),
      desc: desc,
      status: status,
      created: new Date(created),
      alarm: alarm,
      tag_id: tag_id,
      user_id: req.user.id,
    };
    try {
      console.log(taskObj);
      const result = await db.addTask(taskObj);
      return res.status(200).json({ msg: 'task added' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'server error' });
    }
  }
);

// TESTED OKAY
/**
 * @route    PUT list/
 * @desc     modify a task from list for a user
 * @access    private
 */
router.put(
  '/',
  [
    auth,
    [
      check('desc', 'Description cannot be empty').not().isEmpty(),
      check('status', 'Status is empty').not().isEmpty(),
      check('created', 'Created time is empty').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { task_id, desc, status, created, alarm, tag_id } = req.body;
    const taskObj = {
      desc: desc,
      status: status,
      created: new Date(created),
      alarm: alarm,
      tag_id: tag_id,
      user_id: req.user.id,
    };
    try {
      // check existence
      const result = await db.getTaskById(task_id);
      if (result.length == 0)
        return res.status(404).json({ msg: 'non existence task' });
      await db.modifyTask(taskObj, task_id);
      taskObj.task_id = task_id;
      return res.status(200).json(taskObj);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'server error' });
    }
  }
);

// TESTED OKAY
/**
 * @route    DELETE list/
 * @desc     delete a task from list for a user
 * @access    private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    // check if task exist
    const findOne = await db.getTaskById(req.params.id);
    if (findOne.length === 0) {
      return res.status(404).json({ msg: 'non existence task' });
    }
    const deleted = await db.delTask(req.params.id);
    res.status(200).json({ msg: 'task deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

// TESTED OKAY
/**
 * @route    GET list?tag_id&order
 * @desc     get task list by userid, tag_id and order by created time
 * @access    private
 */
router.get('/', auth, async (req, res) => {
  try {
    console.log(req.query.order);
    if (req.query.tag_id && req.query.order) {
      const list = await db.sortByTime(
        req.query.order,
        req.query.tag_id,
        req.user.id
      );
      return res.status(200).json(list);
    }
    throw 'Missing request queries';
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'server error' });
  }
});

// this only for testing
router.get('/:id', auth, async (req, res) => {
  try {
    const aTask = await db.getTaskById(req.params.id);
    console.log(aTask);
    res.send(aTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

// this only for testing
router.get('/all/tag', async (req, res) => {
  try {
    const tags = await db.getAllTags();
    res.send(tags);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});
// this only for testing
router.get('/all/task', async (req, res) => {
  try {
    const tasks = await db.getAllTasks();
    res.send(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

module.exports = router;

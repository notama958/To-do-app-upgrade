const express = require('express');
const router = express.Router();
const db = require('../sql/db-config');
const { check, validationResult } = require('express-validator');
// brcypt for password
const brypt = require('bcryptjs');
// middleware check
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
// environment variables
const dotenv = require('dotenv');
dotenv.config();
// faker
const faker = require('faker');

/**
 * @route  GET user/auth
 * @desc    test route
 * @access  private
 */
router.get('/', auth, async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(401).json({ message: 'Token is invalid' });
    }
    const user = await db.getUserById(req.user.id);
    console.log('Info of user ', req.user.id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

/**
 * @access   POST user/login
 * @desc      validate user login
 * @access    public
 */
router.post(
  '/login',
  [
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const inputErr = validationResult(req);
    if (!inputErr.isEmpty()) {
      return res.status(400).json({ errors: inputErr.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await db.getUserbyEmail(email);
      if (user.length == 0) {
        return res.status(404).json({ errors: [{ msg: 'Invalid email' }] });
      }
      const isMatch = await brypt.compare(password, user[0].password);
      if (!isMatch) {
        return res.status(404).json({ errors: [{ msg: 'Invalid password' }] });
      }
      jwt.sign(
        {
          user: {
            id: user[0].user_id,
          },
        },
        process.env.JWT_TOKEN,
        { expiresIn: 7200 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      console.log('Login user ', user[0].user_id);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: 'something went wrong here',
      });
    }
  }
);

/**
 * @route  POST user/register
 * @desc    register user
 * @access  public
 */
router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    try {
      // check existing user
      let user = await db.getUserbyEmail(email);
      // console.log(user);
      if (user.length > 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      user = {
        user_id: faker.datatype.number({
          min: 1000,
          max: 9999,
        }),
        username: username,
        password: password,
        email: email,
      };
      const salt = await brypt.genSalt(10);
      user.password = await brypt.hash(password, salt);
      await db.userRegister(user);
      jwt.sign(
        {
          user: {
            id: user.user_id,
          },
        },
        process.env.JWT_TOKEN,
        { expiresIn: 7200 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      console.log('Register user ', user.user_id);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('something went wrong');
    }
  }
);

//DELETE      user/
//@ route       DELETE user/
//@des         delete user
//@access      private
router.delete('/', auth, async (req, res) => {
  try {
    // remove user and any tags + tasks under this user
    await db.removeUser(req.user.id);
    console.log('Delete user ', req.user.id);
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'server error' });
  }
});

//PUT      user/
//@ route       PUT user/
//@des         update user info: username and password
//@access      private
router.put('/', auth, async (req, res) => {
  try {
    const { username, password } = req.body;

    // update username
    if (username && username !== '')
      await db.updateUserName(req.user.id, username);
    // remove any tasks under this user
    if (password && password !== '') {
      const salt = await brypt.genSalt(10);
      hashedPwd = await brypt.hash(password, salt);
      await db.updatePassword(req.user.id, hashedPwd);
    }
    console.log('Update user ', req.user.id);
    res.json({ msg: 'User Updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'server error' });
  }
});

// for testing only

router.get('/all', async (req, res) => {
  try {
    const result = await db.getAllUser();
    return res.send(result);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;

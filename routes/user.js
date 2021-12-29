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
    // request is passed from auth
    const user = await db.getUserById(req.user.id);
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
      return res.status(400).json({ errors: errors.array() });
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
      console.log(user);
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
    } catch (err) {
      console.log(err.message);
      res.status(500).send('something went wrong');
    }
  }
);
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

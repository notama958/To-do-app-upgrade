const express = require('express');
const router = express.Router();
const db = require('../sql/db-config');
// environment variables
const dotenv = require('dotenv');
dotenv.config();
// req validation check
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const faker = require('faker');
/**
 * @route    GET tag/
 * @desc     get tag list of a user, there would be 3 default tags includes priority, normal and important
 * @access    public
 */
router.get('/', auth, async (req, res) => {
  try {
    const tags = await db.getTag(req.user.id);
    console.log(req.user.id);
    console.log(tags);
    res.status(200).json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'something went wrong here',
    });
  }
});

/**
 * @route    POST tag/
 * @desc     add a tag
 * @access    public
 */

router.post(
  '/',
  [auth, check('tagname', 'text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { tagname } = req.body;
    try {
      // check if tagname in db yet
      let tag = await db.getTagByName(tagname);
      console.log(tag);
      if (tag.length > 0) {
        return res.status(400).json({ errors: [{ msg: 'Duplicated Tag' }] });
      }
      tag = {
        tag_id: faker.datatype.number({
          min: 100,
          max: 999,
        }),
        tagname: tagname,
        owner_id: req.user.id,
      };
      const newTag = await db.addTag(tag);
      return res.status(200).json(tag);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  }
);

/**
 * TESTED OKAY
 * @route    PUT tag/
 * @desc     modify a tag
 * @access    public
 */
router.put(
  '/:id',
  [auth, check('tagname', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { tagname } = req.body;
    try {
      // check if tag exist
      let tag = await db.getTagById(req.params.id);
      console.log(tag);
      if (tag.length === 0) {
        return res.status(404).json({ errors: [{ msg: 'Non existed tag' }] });
      }
      // check priviledge
      if (tag[0].owner_id !== req.user.id) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Privilege actions only' }] });
      }
      // clone a new object from old => edit => push to db
      tag[0].tagname = tagname;
      delete tag[0].tag_id;
      const newTag = {
        tag_id: req.params.id,
        tagname: tagname,
        owner_id: tag[0].owner_id,
      };
      await db.modifyTag(tag[0], newTag.tag_id);
      return res.status(200).json(newTag);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: 'something went wrong here',
      });
    }
  }
);

/**
 * TESTED OKAY
 * @route    DELETE tag/
 * @desc     delete a tag
 * @access    private
 */
router.delete('/:id', auth, async (req, res) => {
  console.log(req.user.id);
  try {
    // check tag existence and priviledge
    const wantToDelTag = await db.getTagById(req.params.id);
    if (wantToDelTag.length === 0) {
      return res.status(404).json({ errors: [{ msg: 'Non existed tag' }] });
    }
    console.log(wantToDelTag);
    if (wantToDelTag[0].owner_id !== req.user.id) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'Priviledge access only' }] });
    }
    // meet all criteria => delete it
    await db.delTag(req.params.id);
    return res.status(200).json({ msg: 'tag deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'something went wrong here',
    });
  }
});

module.exports = router;

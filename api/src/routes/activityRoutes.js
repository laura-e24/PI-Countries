const express = require('express')
const controllers = require('../controllers/activityControllers')
const router = express.Router()

const { createActivity, getActivities, deleteActivity, restoreActivity } = controllers;

router.route('/')
  .get(getActivities)
  .post(createActivity)
router.route('/:id')
  .delete(deleteActivity)
  .post(restoreActivity)

module.exports = router;
const express = require('express')
const controllers = require('../controllers/activityControllers')
const router = express.Router()

const { createActivity, getActivities, deleteActivity, restoreActivity, getOneActivity, updateActivity } = controllers;

router.route('/')
  .get(getActivities)
  .post(createActivity)
router.route('/:activityId')
  .get(getOneActivity)
  .delete(deleteActivity)
  .post(restoreActivity)
  .patch(updateActivity)

module.exports = router;
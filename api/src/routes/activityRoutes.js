const express = require('express')
const controllers = require('../controllers/activityControllers')
const router = express.Router()

const { createActivity, getActivities } = controllers;

router.route('/')
  .get(getActivities)
  .post(createActivity)

module.exports = router;
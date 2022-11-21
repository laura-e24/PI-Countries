const express = require('express')
const controllers = require('../controllers/activityControllers')
const router = express.Router()

const { createActivity } = controllers;

router.post('/', createActivity)

module.exports = router;
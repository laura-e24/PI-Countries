const express = require('express')
const controllers = require('../controllers/countryControllers.js')
const router = express.Router()

const { getCountries, getOneCountry } = controllers;

router.get('/', getCountries)
router.get('/:countryId', getOneCountry)

module.exports = router;
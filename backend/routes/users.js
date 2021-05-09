const express = require('express'),
  router = express.Router(),
  controller = require('../controllers/users')

router.get('/', controller.list)

module.exports = router
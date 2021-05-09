const express = require('express'),
  router = express.Router(),
  controller = require('../controllers/users')

router.get('/:id', controller.index)
router.get('/', controller.list)

module.exports = router
const express = require('express'),
  router = express.Router(),
  controller = require('../controllers/users')

router.get('/add', controller.addUser)
router.get('/:id', controller.index)
router.post('/:id', controller.update)
router.get('/', controller.list)
router.post('/', controller.register)

module.exports = router
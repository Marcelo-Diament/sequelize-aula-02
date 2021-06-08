const express = require('express'),
  router = express.Router(),
  controller = require('../controllers/users'),
  upload = require('../middleware/upload')


router.post('/search/:searchParam/:searchValue', controller.search)
router.get('/search/:searchParam/:searchValue', controller.search)
router.get('/add', controller.addUser)
router.post('/:id/delete', controller.delete)
router.get('/:id', controller.index)
router.post('/:id', controller.update)
router.get('/', controller.list)
router.post('/', upload.single('avatar'), controller.register)

module.exports = router
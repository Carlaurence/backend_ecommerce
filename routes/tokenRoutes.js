const express = require('express')
const router = express.Router();
const token = require('../controller/tokenController')

router.post('/', token.createToken)
router.get('/:token', token.validateTokenAuthenticity)

module.exports = router;
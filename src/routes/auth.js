const router = require('express').Router();
const auth = require('../controller/auth');

router.post('/login', auth.loginStudent);

module.exports = router;


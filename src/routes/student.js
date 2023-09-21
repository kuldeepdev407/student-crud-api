const router = require('express').Router();
const student = require('../controller/student');
const { verifyJWT } = require('../middleware/auth');

router.post('/add', verifyJWT, student.addStudent);
router.get('/get/all', verifyJWT, student.getAllStudent);
router.get('/get/:id', verifyJWT, student.getStudent);
router.delete('/del/:id', verifyJWT, student.deleteStudent);
router.post('/update/:id', verifyJWT, student.updateStudent);
router.get("/init", student.init);
module.exports = router;


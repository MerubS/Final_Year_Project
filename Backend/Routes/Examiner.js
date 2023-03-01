const express = require('express')
const router = express.Router()

const {
    getExaminerbyId,
} = require('../Controllers/ExaminerController');

router.post('/getExaminerbyId', getExaminerbyId);
module.exports = router;
const express = require('express')
const router = express.Router()

const {
    CreateQuestion,
    UpdateQuestion,
    DeleteQuestion,
    getAllQuestion,
    getQuestionbyId,
    getQuestionbyTestId
} = require('../Controllers/QuestionController')

router.get('/getAllQuestion', getAllQuestion);
router.get('/getQuestionbyId', getQuestionbyId);
router.get('/DeleteQuestion', DeleteQuestion);
router.post('/CreateQuestion', CreateQuestion);
router.post('/UpdateQuestion', UpdateQuestion);
router.get('/getQuestionbyTestId', getQuestionbyTestId);

module.exports = router;
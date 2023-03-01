const express = require('express')
const router = express.Router()

const {
    CreateCandidate,
    SaveLogsOfCandidate
} = require('../Controllers/CandidateController');

router.post('/CreateCandidate', CreateCandidate);
router.post('/SaveCandidateLogs' , SaveLogsOfCandidate)
module.exports = router;
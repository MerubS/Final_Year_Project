const express = require('express')
const router = express.Router()

const {
    CreateCandidate,
    SaveLogsOfCandidate,
    Getface_encoding,
    Saveface_encoding
} = require('../Controllers/CandidateController');

router.post('/CreateCandidate', CreateCandidate);
router.post('/SaveCandidateLogs' , SaveLogsOfCandidate);
router.get('/GetFaceEncoding' , Getface_encoding);
router.post('/SaveFaceEncoding' , Saveface_encoding);
module.exports = router;
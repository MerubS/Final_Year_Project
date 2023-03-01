const express = require('express')
const router = express.Router()

const {
    CreateTest,
    getAllTest,
    UpdateTest,
    DeleteTest,
    getTestbyId,
    UpdateTestStatus
} = require('../Controllers/TestController')

router.get('/getAllTest', getAllTest);
router.get('/DeleteTest', DeleteTest);
router.post('/CreateTest', CreateTest);
router.post('/UpdateTest', UpdateTest);
router.get('/getTestbyId', getTestbyId);
router.post('/UpdateTestStatus',UpdateTestStatus);


module.exports = router;
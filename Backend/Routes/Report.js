const express = require('express')
const router = express.Router()

const {
    UpdateReport,
    getAllReport,
    getReportbyId
} = require('../Controllers/ReportController')

router.get('/getAllReport', getAllReport);
router.post('/UpdateReport', UpdateReport);
router.get('/getReportbyId', getReportbyId );

module.exports = router;
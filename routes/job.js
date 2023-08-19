const express = require('express');
const router = express.Router();
const jobList = require('../controllers/jobsController');
router.get('/list' , jobList.jobPage);
module.exports = router;
const express = require('express');

const router = express.Router();
//const jobsController = require('../controllers/jobsController');
const userRoutes = require('./userRoutes');
const studentRoutes = require('./studentRoute');
const homeController = require('../controllers/homeController');
const companyRoutes = require('./companyRoute');
const passport = require('passport');

router.get('/', passport.checkAuthentication, homeController.homePage);
router.use('/users', userRoutes);
router.use('/students', studentRoutes);
router.use('/company', companyRoutes);
router.use('/job', require('./job'));

//router.use('/jobs', jobsController.index);
module.exports = router;

const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userControllers');

// ------------------------- Get Requests -----------------------

router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.get('/signout', passport.checkAuthentication, userController.signout);
router.get('/download-csv', passport.checkAuthentication, userController.downloadCsv);

router.get('/profile', passport.checkAuthentication, userController.profilePage);
router.post('/profile/update/:id', passport.checkAuthentication, userController.updateProfile);

// ------------------------- Post Request -----------------------

router.post('/create', userController.createUser);
router.post('/create-session', passport.authenticate('local', { failureRedirect: '/users/signin' }), userController.createSession);

module.exports = router;

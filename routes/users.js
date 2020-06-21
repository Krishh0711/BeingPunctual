const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile',usersController.profile);
router.post('/add-habit',usersController.addHabit);
router.get('/habit-detail/:id',usersController.getHabitDetail);
router.post('/insert-progress',usersController.insertProgress);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);
router.post('/create-session', usersController.createSession);
router.get('/sign-out',usersController.signOut);
module.exports = router;
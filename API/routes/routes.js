var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/HomeController');
var UserController = require('../controllers/UserController');
var adminAuth = require('../middleware/adminAuth');

// Routes with adminAuth middleware will only be accessed by admins

router.get('/', HomeController.index);
router.post('/user/create', UserController.create);
router.get('/user',adminAuth, UserController.index);
router.get('/user/:id',adminAuth, UserController.findUser);
router.put('/user/:id',adminAuth, UserController.update);
router.delete('/user/:id',adminAuth, UserController.delete);
router.post('/user/recovery', UserController.recoverPassword);
router.post('/user/newpassword', UserController.changePassword);
router.post('/user/login', UserController.login);


module.exports = router;

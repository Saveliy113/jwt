const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

router.post('/signUp',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userController.signUp
);
router.post('/signIn', userController.signIn);
router.get('/signIn/google', userController.signInWithGoogle);
router.post('/signOut', userController.signOut);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;
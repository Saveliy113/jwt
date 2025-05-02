const Router = require('express').Router;
const { body } = require('express-validator');
const passport = require('passport');

const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

router.post('/signUp',
    body('email').isEmail(),
    body('username').isLength({ min: 3, max: 32 }),
    body('password').isLength({ min: 3, max: 32 }),
    userController.signUp
);
router.post('/signIn', userController.signIn);
router.get('/signIn/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/signIn/google/callback', passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/signIn`,
    session: false
  }),
  userController.googleCallback
)
router.post('/signOut', userController.signOut);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;
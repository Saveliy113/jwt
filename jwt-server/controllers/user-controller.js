const { validationResult } = require('express-validator');
const passport = require('passport');

const userService = require('../service/user-service');
const ApiError = require('../exceptions/api-error');

class UserController {
    async signUp (req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors));
            }
            const { email, username, password } = req.body;
            const userData = await userService.signUp(email, username, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,

            });
            return res.status(200).json(userData);
        } catch (error) {
            console.log('ERROR ! ERROR !!')
            next(error);
        }
    }

    async signIn (req, res, next) {
        try {
            const { email, password } = req.body;

            const userData = await userService.signIn(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,

            });
            return res.status(200).json(userData);
        } catch (error) {
            next(error); 
        }
    }

    async signInWithGoogle (req, res, next) {
        try {
            passport.authenticate('google', { scope: ['email', 'profile'] })(req, res, next);
        } catch (error) {
            next(error);
        }
    }

    async signOut (req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.signOut(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json(token);
        } catch (error) {
            next(error);
        }
    }

    async activate (req, res, next) {
        try {
            const activationLink = req.params.link;

            await userService.activate(activationLink);

            return res.redirect(`${process.env.CLIENT_URL}/activate`);
        } catch (error) {
            next(error);
        }
    }

    async refresh (req, res, next) {
        try {
            const { refreshToken  } = req.cookies;

            const userData = await userService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,

            });

            return res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    }

    async getUsers (req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        console.log('AuthHeader: ', authHeader);
        if (!authHeader) {
            return next(ApiError.UnauthorizedError());
        }
        const accessToken = authHeader.split(' ')[1];
        console.log('Access token: ', accessToken);
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }
        
        const userData = tokenService.validateAccessToken(accessToken);
        console.log('User Data: ', userData);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;

        next();
    } catch (error) {
        return next(ApiError.UnauthorizedError());
    }
}
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const User = require('../models/user-model');

const mailService = require('../service/mail-service');
const tokenService = require('../service/token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
    async signUp(email, username, password) {
        const candidate = await User.findOne({ email });

        if (candidate) {
            throw ApiError.BadRequest(`User with email ${email} already exists`)
        }

        const hashedPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await User.create({ email, username, password: hashedPassword, activationLink });

        await mailService.sendActivationMail(email, `${process.env.CLIENT_URL}/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = await tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }

    async signIn(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw ApiError.BadRequest(`Пользователь с email ${email} не существует`);
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }

    async signOut(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await User.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
}

    async activate(activationLink) {
        const user = await User.findOne({ activationLink });
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации');
        }
    
        user.isActivated = true;
        await user.save();
    }

    async getAllUsers() {
        const users = await User.find();
        return users;
    }
}

module.exports = new UserService();
const UserModel = require('../models/user-model');
const { logger } = require('../../util/logger');

class UserService {
    async create(user) {
        try {
            const userModel = new UserModel(user);
            await userModel.save();
            return userModel;
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    async find(query) {
        try {
            return await UserModel.findOne(query);
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }
}

module.exports = new UserService();

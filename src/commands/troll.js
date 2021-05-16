const userService = require('../services/user-service');

const userLookup = async (user) => {
    // TODO Clean this mess
    const userModel = await userService.find(user);
    if (userModel)
        return userModel
    return await userService.create(user)
};

const incrementTrollCounter = async (user) => {
    user.troll_counter += 1;
    return user;
};

const updateUserModel = async (user) => {
    await user.save();
    return user;
};

const findUserToIncrement = async (user) => {
    return await incrementTrollCounter(await userLookup(user));
};

const userAfterCount = async (user) => {
    return await updateUserModel(await findUserToIncrement(user));
};

const trollCounterOf = async (user) => {
    return (await userAfterCount(user)).troll_counter;
};

const troll = async (userModel) => {
    // TODO: Template processing
    return `${userModel.user} esta es tu trolleada numero: ${await trollCounterOf(userModel)}`;
};


module.exports = { troll };

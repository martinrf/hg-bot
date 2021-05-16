const userService = require('../services/user-service');

const userLookup = async (user) => {
    // TODO Clean this mess
    const userModel = await userService.find(user);
    if (userModel)
        return userModel
    return await userService.create(user)
};

const incrementEntraronCounter = async (user) => {
    user.entraron_counter += 1;
    return user;
};

const updateUserModel = async (user) => {
    await user.save();
    return user;
};

const findUserToIncrement = async (user) => {
    return await incrementEntraronCounter(await userLookup(user));
};

const userAfterCount = async (user) => {
    return await updateUserModel(await findUserToIncrement(user));
};

const entraronCounterOf = async (user) => {
    return (await userAfterCount(user)).entraron_counter;
};

const entraron = async (troll, victima) => {
    // TODO: Template processing
    return `${troll.user} hiciste entrar a ${victima.user} sumando un total de ${await entraronCounterOf(troll)} victimas`;
};


module.exports = { entraron };

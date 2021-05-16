require('dotenv').config();
const { logger } = require('./util/logger');
const { Client } = require('discord.js');
const botToken = process.env.DISCORD_TOKEN;
const PREFIX = '!'
const client = new Client();
const mongoose = require('mongoose');
const mongoOptions = require('./mongoConfig');
const ENVIRONMENT = process.env.NODE_ENV;
const MONGODB_URI = process.env.MONGODB_URI;
const { troll } = require('./src/commands/troll');


(function connect () {
    mongoose.connect(MONGODB_URI,{
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, mongoOptions)
        .then(() => logger.info(`Success connection to database from ${ENVIRONMENT}`))
        .catch(err => {
            logger.info(err);
            setTimeout(connect, 35000);
        });
})();

client.on('ready', () => {
    logger.info(`${client.user.tag} it's ready for rumble!`)
    logger.info(`Debug level set to '${process.env.LOG_LEVEL}'`)
});

client.on('message', (message) => {
    logger.info(message.content);
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)){
        const [command, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(' ');
        logger.debug(command);
        const user = [...args][0];
        logger.debug(user);
        message.channel.send(troll({user}));
    }
})

client.login(botToken);


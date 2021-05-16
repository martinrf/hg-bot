require('dotenv').config();
const winston = require('winston');
const os = require('os');
const pJson = require('../package.json');
require('winston-daily-rotate-file');
const level = process.env.LOG_LEVEL;
const NODE_ENV = process.env.NODE_ENV;
const consoleTransport = new winston.transports.Console({ level: level });

const transportDailyRotate = new (winston.transports.DailyRotateFile)({
    filename: `${pJson.name}-%DATE%.log`,
    dirname: 'logs',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxSize: '20m'
});

const logger = winston.createLogger({
    level: level,
    defaultMeta: {
        appInfo: {
            name: pJson.name,
            version: pJson.version,
            environment: NODE_ENV
        },
        os: {
            hostname: os.hostname()
        }
    },
    transports: [
        consoleTransport,
        transportDailyRotate
    ]
});

module.exports = {
    logger
};

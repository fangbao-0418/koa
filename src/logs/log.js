import log4js from 'log4js'

log4js.configure({
    appenders: {
        file: {
            type: 'file',
            filename: 'logs/main.log',
            maxLogSize: 20480,
            backups: 10,
        },
        console: {
            type: 'stdout',
        },
    },
    categories: {
        development: {
            appenders: ['file', 'console'],
            level: 'all',
        },
        production: {
            appenders: ['file'],
            level: 'info',
        },
        default: {
            appenders: ['file'],
            level: 'info',
        },
    }
})
const logger = log4js.getLogger('development');

export default logger;

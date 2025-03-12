import winston from "winston";

const options = {
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  file: {
    level: "info",
    filename: `./logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.File(options.file),
  ],
  exitOnError: false,
});

export default logger;

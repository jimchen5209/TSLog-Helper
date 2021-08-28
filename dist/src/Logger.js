"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catService = void 0;
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
const typescript_logging_1 = require("typescript-logging");
const FileLogger_1 = require("./FileLogger");
if (!fs_1.default.existsSync('./logs'))
    fs_1.default.mkdirSync('./logs');
const logPath = `./logs/${(0, moment_1.default)().format('YYYY-MM-DD-HH-mm-ss')}.log`;
const defaultConfig = new typescript_logging_1.CategoryConfiguration(typescript_logging_1.LogLevel.Info, typescript_logging_1.LoggerType.Custom, new typescript_logging_1.CategoryLogFormat(), (category, runtimeSettings) => new FileLogger_1.FileLogger(category, runtimeSettings, logPath));
typescript_logging_1.CategoryServiceFactory.setDefaultConfiguration(defaultConfig);
exports.catService = new typescript_logging_1.Category('Main');
//# sourceMappingURL=Logger.js.map
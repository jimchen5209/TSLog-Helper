"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLogger = void 0;
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
const typescript_logging_1 = require("typescript-logging");
class FileLogger extends typescript_logging_1.AbstractCategoryLogger {
    constructor(category, runtimeSettings, logPath) {
        super(category, runtimeSettings);
        this.logPath = logPath;
    }
    doLog(msg) {
        const time = (0, moment_1.default)(msg.date).format('YYYY-MM-DD HH:mm:ss,SSS');
        const categories = [];
        msg.categories.forEach((value) => {
            categories.push(value.name);
        });
        const message = `[${time}][${categories.join('/')}][${typescript_logging_1.LogLevel[msg.level].toString()}] ${msg.messageAsString}`;
        console.log(message);
        fs_1.default.appendFileSync(this.logPath, `${message}\n`);
    }
}
exports.FileLogger = FileLogger;
//# sourceMappingURL=FileLogger.js.map
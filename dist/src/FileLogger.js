"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLogger = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
const fs_1 = require("fs");
class FileLogger {
    constructor(logger, baseFileName = undefined, timeZone = undefined, debug = false, logRaw = false) {
        if (!(0, fs_1.existsSync)('./logs'))
            (0, fs_1.mkdirSync)('./logs');
        this.timeZone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
        dayjs_1.default.extend(utc_1.default);
        dayjs_1.default.extend(timezone_1.default);
        dayjs_1.default.extend(customParseFormat_1.default);
        this.baseFileName = baseFileName || dayjs_1.default.utc().tz(this.timeZone).format('YYYY-MM-DD-HH-mm-ss');
        this.debug = debug;
        this.logRaw = logRaw;
        logger.attachTransport({
            silly: this.logToFile,
            debug: this.logToFile,
            trace: this.logToFile,
            info: this.logToFile,
            warn: this.logToFile,
            error: this.logToFile,
            fatal: this.logToFile
        });
    }
    logToFile(logObject) {
        const message = `${(0, dayjs_1.default)(logObject.date).utc().tz(this.timeZone).format('YYYY-MM-DD HH:mm:ss.SSS')}\t${logObject.logLevel}\t[${logObject.loggerName} ${logObject.filePath}:${logObject.lineNumber}]\t${logObject.argumentsArray}`;
        const normalPath = `./logs/${this.baseFileName}.log`;
        const rawNormalPath = `./logs/${this.baseFileName}-raw.log`;
        const debugPath = `./logs/${this.baseFileName}-debug.log`;
        const rawDebugPath = `./logs/${this.baseFileName}-debug-raw.log`;
        if (logObject.logLevelId >= 3) {
            (0, fs_1.appendFileSync)(normalPath, `${message}\n`);
            if (this.logRaw)
                (0, fs_1.appendFileSync)(rawNormalPath, `${JSON.stringify(logObject)}\n`);
        }
        else if (this.debug) {
            (0, fs_1.appendFileSync)(debugPath, `${message}\n`);
            if (this.logRaw)
                (0, fs_1.appendFileSync)(rawDebugPath, `${JSON.stringify(logObject)}\n`);
        }
    }
    setDebug(debug) {
        this.debug = debug;
    }
    setLogRaw(logRaw) {
        this.logRaw = logRaw;
    }
}
exports.FileLogger = FileLogger;
//# sourceMappingURL=FileLogger.js.map
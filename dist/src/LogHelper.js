"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogHelper = void 0;
const tslog_1 = require("tslog");
const FileLogger_1 = require("./FileLogger");
let fileLogger;
function logToFile(logObject) {
    fileLogger.logToFile(logObject);
}
class LogHelper {
    constructor(config = {}) {
        const settings = config.settingsOverride || {};
        settings.name = settings.name || config.name || 'Main';
        settings.overwriteConsole = settings.overwriteConsole || true;
        settings.dateTimeTimezone = settings.dateTimeTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
        settings.minLevel = settings.minLevel || (config.debug ? 'silly' : 'info');
        this._logger = new tslog_1.Logger(settings);
        fileLogger = new FileLogger_1.FileLogger(undefined, settings.dateTimeTimezone, config.debug, config.logRaw);
        this._logger.attachTransport({
            silly: logToFile,
            debug: logToFile,
            trace: logToFile,
            info: logToFile,
            warn: logToFile,
            error: logToFile,
            fatal: logToFile
        });
    }
    get logger() {
        return this._logger;
    }
    setDebug(debug) {
        this._logger.setSettings({ minLevel: debug ? 'silly' : 'info' });
        fileLogger.setDebug(debug);
    }
    setLogRaw(logRaw) {
        fileLogger.setLogRaw(logRaw);
    }
}
exports.LogHelper = LogHelper;
//# sourceMappingURL=LogHelper.js.map
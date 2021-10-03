"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogHelper = void 0;
const tslog_1 = require("tslog");
const FileLogger_1 = require("./FileLogger");
class LogHelper {
    constructor(config = {}) {
        const settings = config.settingsOverride || {};
        settings.name = settings.name || config.name;
        settings.overwriteConsole = settings.overwriteConsole || true;
        settings.dateTimeTimezone = settings.dateTimeTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
        settings.minLevel = settings.minLevel || (config.debug ? 'silly' : 'info');
        this._logger = new tslog_1.Logger(settings);
        this.fileLogger = new FileLogger_1.FileLogger(this._logger, undefined, settings.dateTimeTimezone, config.debug, config.logRaw);
    }
    get logger() {
        return this._logger;
    }
    setDebug(debug) {
        this._logger.setSettings({ minLevel: debug ? 'silly' : 'info' });
        this.fileLogger.setDebug(debug);
    }
    setLogRaw(logRaw) {
        this.fileLogger.setLogRaw(logRaw);
    }
}
exports.LogHelper = LogHelper;
//# sourceMappingURL=LogHelper.js.map
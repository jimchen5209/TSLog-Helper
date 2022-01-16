import { ILogObject, ISettingsParam, Logger } from 'tslog';
import { FileLogger } from './FileLogger';

let fileLogger: FileLogger;

function logToFile(logObject: ILogObject) {
    fileLogger.logToFile(logObject);
}


/**
 * Config for logging helper
 */
export interface ILogHelperConfig {
    name?: string,
    debug?: boolean,
    logRaw?: boolean,
    settingsOverride?: ISettingsParam
}

export class LogHelper {
    private _logger: Logger;

    /**
     * TSLog Help for jimchen5209's node project
     */
    constructor(config: ILogHelperConfig = {}) {
        const settings = config.settingsOverride || {};
        settings.name = settings.name || config.name || 'Main';
        settings.overwriteConsole = settings.overwriteConsole || true;
        settings.dateTimeTimezone = settings.dateTimeTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
        settings.minLevel = settings.minLevel || (config.debug ? 'silly' : 'info');

        this._logger = new Logger(settings);
        fileLogger = new FileLogger(undefined, settings.dateTimeTimezone, config.debug, config.logRaw);
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

    public get logger(): Logger {
        return this._logger;
    }

    /**
     * Change logger debug level
     */
    public setDebug(debug: boolean) {
        this._logger.setSettings({ minLevel: debug ? 'silly' : 'info' });
        fileLogger.setDebug(debug);
    }

    /**
     * Change whether logging raw json log into file
     */
    public setLogRaw(logRaw: boolean) {
        fileLogger.setLogRaw(logRaw);
    }
}

import { ISettingsParam, Logger } from 'tslog';
import { FileLogger } from './FileLogger';

export interface ILogHelperConfig {
    name?: string,
    debug?: boolean,
    logRaw?: boolean,
    settingsOverride?: ISettingsParam
}

export class LogHelper {
    private _logger: Logger;
    private fileLogger: FileLogger;

    constructor(config: ILogHelperConfig = {}) {
        const settings = config.settingsOverride || {};
        settings.name = settings.name || config.name;
        settings.overwriteConsole = settings.overwriteConsole || true;
        settings.dateTimeTimezone = settings.dateTimeTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
        settings.minLevel = settings.minLevel || (config.debug ? 'silly' : 'info');

        this._logger = new Logger(settings);
        this.fileLogger = new FileLogger(this._logger, undefined, settings.dateTimeTimezone, config.debug, config.logRaw);
    }

    public get logger(): Logger {
        return this._logger;
    }

    public setDebug(debug: boolean) {
        this._logger.setSettings({ minLevel: debug ? 'silly' : 'info' });
        this.fileLogger.setDebug(debug);
    }

    public setLogRaw(logRaw: boolean) {
        this.fileLogger.setLogRaw(logRaw);
    }
}

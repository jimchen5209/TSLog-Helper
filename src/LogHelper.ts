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

    constructor(config: ILogHelperConfig) {
        const settings = config.settingsOverride || {};
        settings.name = settings.name || config.name;
        settings.overwriteConsole = settings.overwriteConsole || true;
        settings.dateTimeTimezone = settings.dateTimeTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
        settings.minLevel = settings.minLevel || (config.debug ? 'silly' : 'info');

        this._logger = new Logger(settings);
        new FileLogger(this._logger, undefined, settings.dateTimeTimezone, config.debug, config.logRaw);
    }

    public get logger(): Logger {
        return this._logger;
    }
}

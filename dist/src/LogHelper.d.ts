import { ISettingsParam, Logger } from 'tslog';
export interface ILogHelperConfig {
    name?: string;
    debug?: boolean;
    logRaw?: boolean;
    settingsOverride?: ISettingsParam;
}
export declare class LogHelper {
    private _logger;
    constructor(config: ILogHelperConfig);
    get logger(): Logger;
}

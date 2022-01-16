import { ILogObject } from 'tslog';
export declare class FileLogger {
    private baseFileName;
    private debug;
    private timeZone;
    private logRaw;
    constructor(baseFileName?: string | undefined, timeZone?: string | undefined, debug?: boolean, logRaw?: boolean);
    logToFile(logObject: ILogObject): void;
    setDebug(debug: boolean): void;
    setLogRaw(logRaw: boolean): void;
}

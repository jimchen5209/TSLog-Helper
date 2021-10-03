import { Logger } from 'tslog';
export declare class FileLogger {
    private baseFileName;
    private debug;
    private timeZone;
    private logRaw;
    constructor(logger: Logger, baseFileName?: string | undefined, timeZone?: string | undefined, debug?: boolean, logRaw?: boolean);
    private logToFile;
}

import { ILogObject } from 'tslog';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { appendFileSync, existsSync, mkdirSync } from 'fs';

export class FileLogger{
    private baseFileName: string;
    private debug: boolean;
    private timeZone: string;
    private logRaw: boolean;

    /**
     * Helper for setting up the file logger
     */
    constructor(baseFileName: string | undefined = undefined, timeZone: string | undefined = undefined, debug = false, logRaw = false) {
        if (!existsSync('./logs')) mkdirSync('./logs');

        this.timeZone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
        // setup dayjs
        dayjs.extend(utc);
        dayjs.extend(timezone);
        dayjs.extend(customParseFormat);

        this.baseFileName = baseFileName || dayjs.utc().tz(this.timeZone).format('YYYY-MM-DD-HH-mm-ss');
        this.debug = debug;
        this.logRaw = logRaw;
    }

    public logToFile(logObject: ILogObject) {
        const message = `${dayjs(logObject.date).utc().tz(this.timeZone).format('YYYY-MM-DD HH:mm:ss.SSS')}\t${logObject.logLevel}\t[${logObject.loggerName} ${logObject.filePath}:${logObject.lineNumber}]\t${logObject.argumentsArray}`;
        const normalPath = `./logs/${this.baseFileName}.log`;
        const rawNormalPath = `./logs/${this.baseFileName}-raw.log`;
        const debugPath = `./logs/${this.baseFileName}-debug.log`;
        const rawDebugPath = `./logs/${this.baseFileName}-debug-raw.log`;
        if (logObject.logLevelId >= 3) { // info
            appendFileSync(normalPath, `${message}\n`);
            if (this.logRaw) appendFileSync(rawNormalPath, `${JSON.stringify(logObject)}\n`);
        } else if (this.debug) {
            appendFileSync(debugPath, `${message}\n`);
            if (this.logRaw) appendFileSync(rawDebugPath, `${JSON.stringify(logObject)}\n`);
        }
    }

    /**
     * Change whether logging debug, trace and silly log into file
     */
    public setDebug(debug: boolean) {
        this.debug = debug;
    }

    /**
     * Change whether logging raw json log into file
     */
    public setLogRaw(logRaw: boolean) {
        this.logRaw = logRaw;
    }
}

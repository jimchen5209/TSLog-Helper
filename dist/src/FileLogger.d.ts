import { AbstractCategoryLogger, Category, CategoryLogMessage, RuntimeSettings } from 'typescript-logging';
export declare class FileLogger extends AbstractCategoryLogger {
    private logPath;
    constructor(category: Category, runtimeSettings: RuntimeSettings, logPath: string);
    protected doLog(msg: CategoryLogMessage): void;
}

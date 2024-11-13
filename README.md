# TSLog-Helper
A helper for [tslog](https://tslog.js.org/) that creates log file with console output for typescript  

## Deprecation Notice

> [!NOTE]
> **TL;DR** This project is no longer being maintained, Please use [tslog](https://tslog.js.org/) directly instead.

As I am using pm2 for process management, which includes a built-in log management system, there is no longer a need to use this module for file logging.  
Consequently, I won't be maintaining this module any longer.  
Therefore, there are no plans to upgrade tslog to v4, as it would involve significant changes.  
Please use [tslog](https://tslog.js.org/) directly instead.

## Basic usage
1. Install package to your project using:  
```
npm install https://github.com/jimchen5209/TSLog-Helper.git#v2.3.1
```
or  
```
yarn add tslog-helper@jimchen5209/TSLog-Helper#v2.3.1
```
> If you want to use the latest repository version, just remove `#v2.3.1` tag
2. Init main logger and save it as variable  

```typescript
import { LogHelper } from 'tslog-helper';

export class Core {
    private readonly logHelper = new LogHelper();
    public readonly mainLogger = this.logHelper.logger;

    // something else
}
```
3. Then log item using:  
```typescript
this.mainLogger.info('Starting...');
```
Output looks like:  
![image](https://user-images.githubusercontent.com/10269287/149651338-ff5e371f-0fca-488b-9a04-c7f85eb465a4.png)  
  
Also it creates a file located in `logs/2022-01-16-15-06-19.log` with:  
```
2022-01-16 15:06:19.199	info	[Main src/index.ts:8]	Starting...
```

## Migrating from old logging-ts
Due to module name change, you'll need to remove the old module and install the latest module.  
For complete migrating guide, see the [v2.1.0 release section](https://github.com/jimchen5209/TSLog-Helper/releases/tag/2.1.0).

## Advanced Usage
If you want to use a child logger with a name other than 'Main' in one of your componets, simpily get child logger from mainlogger with a new name.  

Example:  

index.ts
```typescript
import { LogHelper } from 'tslog-helper';
import { Test } from './Components/Test'

export class Core {
    private readonly logHelper = new LogHelper();
    public readonly mainLogger = this.logHelper.logger;

    constructor() {
        this.mainLogger.info('Starting...');
        new Test(this);
    }
}

new Core();
```
Components/Test.ts
```typescript
import { Logger } from 'tslog-helper';
import { Core } from '..';

export class Test {
    private logger: Logger;

    constructor(core: Core) {
        this.logger = core.mainLogger.getChildLogger({ name: 'Test'});
        this.logger.info('Test message goes here.');
    }
}
```

Output:  
![image](https://user-images.githubusercontent.com/10269287/149651412-65a1fcd9-5f40-4fcf-9a4d-e67b1c652f23.png)  

If you want to turn on debug logging and raw log (only to file) after `LogHelper()` initialized, add the following code:
```typescript
this.logHelper.setDebug(true);
```
```typescript
this.logHelper.setLogRaw(true);
```

Further usage document refers to: https://tslog.js.org/

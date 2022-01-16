# TSLog-Helper
A helper for [tslog](https://tslog.js.org/) that creates log file with console output for typescript  

## Basic usage
1. Install package to your project using:  
```
npm install https://github.com/jimchen5209/TSLog-Helper.git#2.1.0
```
or  
```
yarn add https://github.com/jimchen5209/TSLog-Helper.git#2.1.0
```
> If you want to use the latest repository version or currently development version, just remove `#2.1.0` tag or change it to `#dev`.  
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
1. Remove old logging-ts  
```
npm uninstall logging-ts
```
or  
```
yarn remove logging-ts 
```
2. Reinstall new module  
```
npm install https://github.com/jimchen5209/TSLog-Helper.git#2.1.0
```
or  
```
yarn add https://github.com/jimchen5209/TSLog-Helper.git#2.1.0
```
3. Change mainLogger code from this:  

```typescript
import { catService } from 'logging-ts';
```
```typescript
public readonly mainLogger = catService;
```
to this:  

```typescript
import { LogHelper } from 'tslog-helper';
```
```typescript
private readonly logHelper = new LogHelper();
public readonly mainLogger = this.logHelper.logger;
```
4. If you're using child logger, then change the following code from this:  

```typescript
import { Category } from 'logging-ts';
```
```typescript
private logger: Category;
```
```typescript
this.logger = new Category('Test', core.mainLogger);
```
to this:

```typescript
import { Logger } from 'tslog-helper';
```
```typescript
private logger: Logger;
```
```typescript
this.logger = core.mainLogger.getChildLogger({ name: 'Test'});
```
## Advanced Usage
If you want to use a child looger with a name other than 'Main' in one of your componets, simpily get child logger from mainlogger with a new name.  

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

Further usage document refers to: https://tslog.js.org/

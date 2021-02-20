# Logging-TS
A module that creates log file with console output for typescript 

## Basic usage

1. Install package to your project using:  
```
npm install https://github.com/jimchen5209/Logging-TS.git
```
or  
```
yarn add https://github.com/jimchen5209/Logging-TS.git
```
2. Init main logger and save it as variable  
Example:  
```typescript
import { catService } from 'logging-ts';

export class Core {
    public readonly mainLogger = catService;

    // something else
}
```
3. Then log item using:  
```typescript
this.mainLogger.info('Starting...');
```
Output looks like:  
```
[2021-02-20 23:06:34,590][Main][Info] Starting...
```
Also it creates a file located in `logs/2021-02-20-23-06-34.log` with this message.

## Advanced Usage
If you want a name other than 'Main' in one of your componets, simpily init a Category with new name and mainlogger.  
Example:  

index.ts
```typescript
import { catService } from 'logging-ts';
import { Test } from './Components/Test'

export class Core {
    public readonly mainLogger = catService;
    constructor() {
        this.mainLogger.info('Starting...');
        new Test(this);
    }
}
```
Components/Test.ts
```typescript
import { Category } from 'logging-ts';
import { Core } from '..';

export class Test {
    private logger: Category;

    constructor(core: Core) {
        this.logger = new Category('Test', core.mainLogger);
        this.logger.info('Test message goes here.');
    }
}
```

Output:
```
[2021-02-20 23:06:34,590][Main][Info] Starting...
[2021-02-20 23:06:34,590][Test][Info] Test message goes here.
```
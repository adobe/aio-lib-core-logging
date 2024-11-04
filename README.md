# aio-lib-core-logging

[![Version](https://img.shields.io/npm/v/@adobe/aio-lib-core-logging.svg)](https://npmjs.org/package/@adobe/aio-lib-core-logging)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/aio-lib-core-logging.svg)](https://npmjs.org/package/@adobe/aio-lib-core-logging)
[![Build Status](https://travis-ci.com/adobe/aio-lib-core-logging.svg?branch=master)](https://travis-ci.com/adobe/aio-lib-core-logging)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) 
[![Codecov Coverage](https://img.shields.io/codecov/c/github/adobe/aio-lib-core-logging/master.svg?style=flat-square)](https://codecov.io/gh/adobe/aio-lib-core-logging/)

Node.js Logger module for use by the Adobe I/O SDK

## Install

`npm install @adobe/aio-lib-core-logging`

## Use

```javascript
let aioLogger = require('@adobe/aio-lib-core-logging')('App')
aioLogger.info('Hello logs')
```

### Output

Above code will log the following
> [App /mynamespace/myaction] info: Hello logs

Where _App_ would be the name of the application/module that is sending the logs.

### Configuration

The logger can be customized by passing a config object at the time of creation.

```javascript
let aioLogger = require('@adobe/aio-lib-core-logging')('App', config)
```

The config object can have one or more of the following keys.

- level (max severity logging level to be logged. can be one of error, warn, info, verbose, debug, silly)
- provider (logging provider. default is winston.)
- logSourceAction (boolean to control whether to include the action name in the log message)
- transports (array of custom winston transports)

The global log level can also be overridden using the env variable AIO_LOG_LEVEL or the env variable LOG_LEVEL.

### Enabling Debug Level Logging on command line
Avoid setting the global env variable by passing the log configuration in front of the aio command and stax flexibel.

To see all logs, do 
```bash
$ DEBUG=* aio app run
```

Once you have figured out what logs you are interrested in, use something more specific, like 
```bash
$ DEBUG=aio-telemetry:telemetry-lib* aio config
```

### Enabling Debug Level Logging programatically

Example of logger configuration:

```javascript
const logger = require('@adobe/aio-lib-core-logging')('MyModuleName', {provider: 'debug'})
logger.info('info')
logger.debug('debug')
```

To see both logs:

```javascript
AIO_LOG_LEVEL = debug
DEBUG = MyModuleName
```

It is possible to set the log level from another environment variable if needed:

```javascript
const logger = require('@adobe/aio-lib-core-logging')('MyModuleName', {provider: 'debug', level: process.env.FOOBAR})
logger.info('info')
logger.debug('debug')
```
### Using custom logger

```javascript
// Winston Logger
let aioLogger = require('@adobe/aio-lib-core-logging')('App', {provider:'winston'})
aioLogger.info('Hello logs')
```

or

```javascript
// Debug Logger
let aioLogger = require('@adobe/aio-lib-core-logging')('App', {provider:'debug'})
```

### Send logs to a file

```javascript
let aioLogger = require('@adobe/aio-lib-core-logging')('App', {transports: './logfile.txt' })
```

### Custom winston transports

```javascript
const winston = require('winston')
let aioLogger = require('@adobe/aio-lib-core-logging')('App', {transports: [new winston.transports.File({ filename: './winstoncustomfilelog.txt' })]})
```

### Creating custom logger
This is currently as simple as creating a new logger class under src with all the log level functions defined

## Explore

`goto` [API](./doc/api.md)

## Contributing

Contributions are welcomed! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.

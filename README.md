# aio-lib-core-logging

[Docs](./doc/api.md)

## Usage
```javascript
let aioLogger = require('aio-lib-core-logging')('App')
aioLogger.info('Hello logs')
```

## Output
Above code will log the following
> [App /mynamespace/myaction] info: Hello logs

Where _App_ would be the name of the application/module that is sending the logs.

## Configuration
The logger can be customized by passing a config object at the time of creation.
```javascript
let aioLogger = require('aio-lib-core-logging')('App', config)
```
The config object can have one or more of the following keys.
- provider (logging provider. default is winston.)
- logSourceAction (boolean to control whether to include the action name in the log message)
- transports (array of custom winston transports)

## Using Custom Logger
```javascript
// Winston Logger
let aioLogger = require('aio-lib-core-logging')('App', {provider:'./WinstonLogger'})
aioLogger.info('Hello logs')
```
or
```javascript
// Debug Logger
let aioLogger = require('aio-lib-core-logging')('App', {provider:'./DebugLogger'})
```

## Sending logs to a file
```javascript
let aioLogger = require('aio-lib-core-logging')('App', {transports: './logfile.txt' })
```

## Using custom winston transports
```javascript
const winston = require('winston')
let aioLogger = require('aio-lib-core-logging')('App', {transports: [new winston.transports.File({ filename: './winstoncustomfilelog.txt' })]})
```

## Contributing

Contributions are welcomed! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.

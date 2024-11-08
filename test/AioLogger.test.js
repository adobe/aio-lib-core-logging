/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const AioLogger = require('../src/AioLogger')
const fs = require('fs-extra')

global.console = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
}

beforeEach(() => {
  global.console.log.mockClear()
  delete process.env.__OW_ACTION_NAME
  delete process.env.DEBUG
  delete process.env.AIO_LOG_LEVEL
})

describe('config', () => {
  test('when using defaults', () => {
    const aioLogger = AioLogger('App')

    expect(aioLogger.config.provider).toEqual('winston')
    expect(aioLogger.config.level).toEqual('info')
    expect(aioLogger.config.logSourceAction).toEqual(false)
    expect(aioLogger.config.transports).toEqual(undefined)
    expect(aioLogger.config.silent).toEqual(false)
  })

  test('when using defaults and __OW_ACTION_NAME is set', () => {
    process.env.__OW_ACTION_NAME = 'fake-action'
    const aioLogger = AioLogger('App')

    expect(aioLogger.config.provider).toEqual('winston')
    expect(aioLogger.config.level).toEqual('info')
    expect(aioLogger.config.logSourceAction).toEqual(true)
    expect(aioLogger.config.transports).toEqual(undefined)
    expect(aioLogger.config.silent).toEqual(false)
  })

  test('when __OW_ACTION_NAME is set and config.logSourceAction = false', () => {
    process.env.__OW_ACTION_NAME = 'fake-action'
    const aioLogger = AioLogger('App', { logSourceAction: false })

    expect(aioLogger.config.provider).toEqual('winston')
    expect(aioLogger.config.level).toEqual('info')
    expect(aioLogger.config.logSourceAction).toEqual(false)
    expect(aioLogger.config.transports).toEqual(undefined)
    expect(aioLogger.config.silent).toEqual(false)
  })

  test('when AIO_LOG_LEVEL is used', () => {
    process.env.AIO_LOG_LEVEL = 'debug'
    const aioLogger = AioLogger('App', { logSourceAction: false })

    expect(aioLogger.config.provider).toEqual('winston')
    expect(aioLogger.config.level).toEqual('debug')
    expect(aioLogger.config.logSourceAction).toEqual(false)
    expect(aioLogger.config.transports).toEqual(undefined)
    expect(aioLogger.config.silent).toEqual(false)
  })
})

describe('winston logger', () => {
  const LOG_FILE_PATH = './logfile.txt'

  function getLog (logFilePath = LOG_FILE_PATH) {
    return new Promise((resolve) => {
      setTimeout(function () {
        const log = fs.readFileSync(logFilePath, 'utf8')
        fs.removeSync(logFilePath)
        resolve(log)
      }, 1000)
    })
  }

  beforeAll(() => {
    fs.removeSync(LOG_FILE_PATH)
    fs.closeSync(fs.openSync(LOG_FILE_PATH, 'w'))
  })

  test('default, with action name', async () => {
    process.env.__OW_ACTION_NAME = 'fake-action'

    const aioLogger = AioLogger()
    const message = 'message'

    aioLogger.error(message)
    aioLogger.warn(message)
    aioLogger.info(message)
    aioLogger.log(message)
    aioLogger.verbose(message)
    aioLogger.debug(message)
    aioLogger.silly(message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(4) // log, info, error, warn
    expect(global.console.log).toHaveBeenLastCalledWith(expect.stringContaining(`[AIO fake-action] info: ${message}`))
  })

  test('default, with variadic message args', async () => {
    const aioLogger = AioLogger()
    const message = ['messageA', 'messageB']

    aioLogger.error(...message)
    aioLogger.warn(...message)
    aioLogger.info(...message)
    aioLogger.log(...message)
    aioLogger.verbose(...message)
    aioLogger.debug(...message)
    aioLogger.silly(...message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(4) // log, info, error, warn
    expect(global.console.log).toHaveBeenLastCalledWith(expect.stringContaining(`[AIO] info: ${message.join(' ')}`))
  })

  test('use log file path', async () => {
    const aioLogger = AioLogger('App', { transports: LOG_FILE_PATH, logSourceAction: false })
    const message = 'message'

    aioLogger.error(message)
    aioLogger.close()

    expect(await getLog(LOG_FILE_PATH)).toContain(`[App] error: ${message}`)
  })

  test('use winston.transports.file', async () => {
    const winston = require('winston')
    const aioLogger = AioLogger('App', { transports: [new winston.transports.File({ filename: LOG_FILE_PATH })], logSourceAction: false })
    const message = 'message'

    aioLogger.error(message)
    aioLogger.close()

    expect(await getLog(LOG_FILE_PATH)).toContain(`[App] error: ${message}`)
  })

  test('with AIO_LOG_LEVEL = error', () => {
    process.env.AIO_LOG_LEVEL = 'error'

    const aioLogger = AioLogger('App')
    const message = 'message'

    aioLogger.error(message)
    aioLogger.info(message)

    expect(global.console.log).toHaveBeenCalledTimes(1) // error level only
  })

  test('bad provider', async () => {
    expect.hasAssertions()

    const provider = '__a_surely_not_supported_provider1234'
    const expectedError = new Error(`log provider ${provider} is not supported, use one of [winston, debug]`)
    const func = () => AioLogger('App', { provider })

    expect(func).toThrow(expectedError)
  })

  test('with string substitution and file transport', async () => {
    // change-me: do not hit real file system and do not wait
    const aioLogger = AioLogger('App', { transports: LOG_FILE_PATH, logSourceAction: false })
    const json = { foo: 'bar' }
    aioLogger.info('message %s %s %d %f %j', 'hello', 'world', 123, 123.456, json)
    aioLogger.close()

    expect(await getLog(LOG_FILE_PATH)).toContain('message hello world 123 123.456 {"foo":"bar"}')
  })

  test('with json object and file transport', async () => {
    // change-me: do not hit real file system and do not wait
    const aioLogger = AioLogger('App', { transports: LOG_FILE_PATH, logSourceAction: false })
    const json = { foo: 'bar' }
    aioLogger.info(json)
    aioLogger.close()

    expect(await getLog(LOG_FILE_PATH)).toContain("{ foo: 'bar' }")
  })
})

describe('debug logger', () => {
  test('DEBUG=*', () => {
    process.env.DEBUG = '*'

    const aioLogger = AioLogger('App', { provider: 'debug' })
    const message = 'message'

    aioLogger.error(message)
    aioLogger.warn(message)
    aioLogger.info(message)
    aioLogger.log(message)
    aioLogger.verbose(message)
    aioLogger.debug(message)
    aioLogger.silly(message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(7) // all levels (extra is log, which is effectively info)
  })

  test('DEBUG=*, with variadic message args', () => {
    process.env.DEBUG = '*'

    const aioLogger = AioLogger('App', { provider: 'debug' })
    const message = ['messageA', 'messageB']

    aioLogger.error(...message)
    aioLogger.warn(...message)
    aioLogger.info(...message)
    aioLogger.log(...message)
    aioLogger.verbose(...message)
    aioLogger.debug(...message)
    aioLogger.silly(...message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(7) // all levels (extra is log, which is effectively info)
    expect(global.console.log).toHaveBeenLastCalledWith(expect.stringMatching(`${message.join(' ')}`))
  })

  test('DEBUG=App:*', () => {
    process.env.DEBUG = 'App:*'

    const aioLogger = AioLogger('App', { provider: 'debug' })
    const message = 'message'

    aioLogger.error(message)
    aioLogger.warn(message)
    aioLogger.info(message)
    aioLogger.verbose(message)
    aioLogger.debug(message)
    aioLogger.silly(message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(6) // all levels
  })

  test('DEBUG=App*', () => {
    process.env.DEBUG = 'App*'

    const aioLogger = AioLogger('App', { provider: 'debug' })
    const message = 'message'

    aioLogger.error(message)
    aioLogger.warn(message)
    aioLogger.info(message)
    aioLogger.verbose(message)
    aioLogger.debug(message)
    aioLogger.silly(message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(6) // all levels
  })

  test('DEBUG=Ap*', () => {
    process.env.DEBUG = 'Ap*'

    const aioLogger = AioLogger('App', { provider: 'debug' })
    const message = 'message'

    aioLogger.error(message)
    aioLogger.warn(message)
    aioLogger.info(message)
    aioLogger.verbose(message)
    aioLogger.debug(message)
    aioLogger.silly(message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(6)
  })

  test('DEBUG=App and AIO_LOG_LEVEL', () => {
    process.env.DEBUG = 'App'

    const aioLogger = AioLogger('App', { provider: 'debug' })
    const message = 'message'

    aioLogger.error(message)
    aioLogger.warn(message)
    aioLogger.info(message)
    aioLogger.verbose(message)
    aioLogger.debug(message)
    aioLogger.silly(message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(3) // info, warn, error levels
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('error'))
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('warn'))
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('info'))
  })

  test('DEBUG=App and AIO_LOG_LEVEL=error', () => {
    process.env.DEBUG = 'App'
    process.env.AIO_LOG_LEVEL = 'error'

    const aioLogger = AioLogger('App', { provider: 'debug' })
    const message = 'message'

    aioLogger.error(message)
    aioLogger.warn(message)
    aioLogger.info(message)
    aioLogger.verbose(message)
    aioLogger.debug(message)
    aioLogger.silly(message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(1) // error level only
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('error'))
  })

  test('DEBUG=App and AIO_LOG_LEVEL=warn', () => {
    process.env.DEBUG = 'App'
    process.env.AIO_LOG_LEVEL = 'warn'

    const aioLogger = AioLogger('App', { provider: 'debug' })
    const message = 'message'

    aioLogger.error(message)
    aioLogger.warn(message)
    aioLogger.info(message)
    aioLogger.verbose(message)
    aioLogger.debug(message)
    aioLogger.silly(message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(2) // warn and error levels only
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('error'))
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('warn'))
  })

  test('DEBUG=App and AIO_LOG_LEVEL=info', () => {
    process.env.DEBUG = 'App'
    process.env.AIO_LOG_LEVEL = 'info'

    const aioLogger = AioLogger('App', { provider: 'debug' })
    const message = 'message'

    aioLogger.error(message)
    aioLogger.warn(message)
    aioLogger.info(message)
    aioLogger.verbose(message)
    aioLogger.debug(message)
    aioLogger.silly(message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(3) // info, warn, error levels only
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('error'))
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('warn'))
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('info'))
  })

  test('DEBUG=App and default AIO_LOG_LEVEL=verbose', () => {
    process.env.DEBUG = 'App'
    process.env.AIO_LOG_LEVEL = 'verbose'

    const aioLogger = AioLogger('App', { provider: 'debug' })
    const message = 'message'

    aioLogger.error(message)
    aioLogger.warn(message)
    aioLogger.info(message)
    aioLogger.verbose(message)
    aioLogger.debug(message)
    aioLogger.silly(message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(4) // verbose, info, warn, error levels only
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('error'))
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('warn'))
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('info'))
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('verbose'))
  })

  test('with Debug and DEBUG=App and AIO_LOG_LEVEL=debug', () => {
    process.env.DEBUG = 'App'
    process.env.AIO_LOG_LEVEL = 'debug'

    const aioLogger = AioLogger('App', { provider: 'debug' })
    const message = 'message'

    aioLogger.error(message)
    aioLogger.warn(message)
    aioLogger.info(message)
    aioLogger.verbose(message)
    aioLogger.debug(message)
    aioLogger.silly(message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(5) // debug, verbose, info, warn, error levels only
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('error'))
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('warn'))
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('info'))
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('verbose'))
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('debug'))
  })

  test('DEBUG=App:debug and AIO_LOG_LEVEL=error', () => {
    // here the log level is ignored and only debug logs will be shown
    process.env.DEBUG = 'App:debug'
    process.env.AIO_LOG_LEVEL = 'error'

    const aioLogger = AioLogger('App', { provider: 'debug' })
    const message = 'message'

    aioLogger.error(message)
    aioLogger.warn(message)
    aioLogger.info(message)
    aioLogger.verbose(message)
    aioLogger.debug(message)
    aioLogger.silly(message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('debug'))
  })

  test('DEBUG=App:warn and AIO_LOG_LEVEL=silly', () => {
    // here the log level is ignored and only WARN logs will be shown
    process.env.DEBUG = 'App:warn'
    process.env.AIO_LOG_LEVEL = 'silly'

    const aioLogger = AioLogger('App', { provider: 'debug' })
    const message = 'message'

    aioLogger.error(message)
    aioLogger.warn(message)
    aioLogger.info(message)
    aioLogger.verbose(message)
    aioLogger.debug(message)
    aioLogger.silly(message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('warn'))
  })

  test('DEBUG=App and AIO_LOG_LEVEL=silly', () => {
    process.env.DEBUG = 'App'
    process.env.AIO_LOG_LEVEL = 'silly'

    const aioLogger = AioLogger('App', { provider: 'debug' })
    const message = 'message'

    aioLogger.error(message)
    aioLogger.warn(message)
    aioLogger.info(message)
    aioLogger.verbose(message)
    aioLogger.debug(message)
    aioLogger.silly(message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(6) // shows all log levels
  })

  test('DEBUG=Ap', () => {
    process.env.DEBUG = 'Ap'
    process.env.AIO_LOG_LEVEL = 'silly'

    const aioLogger = AioLogger('App', { provider: 'debug' })
    const message = 'message'

    aioLogger.error(message)
    aioLogger.warn(message)
    aioLogger.info(message)
    aioLogger.verbose(message)
    aioLogger.debug(message)
    aioLogger.silly(message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(0) // no match
  })

  test('DEBUG=Appnot', () => {
    process.env.DEBUG = 'Apnot'
    process.env.AIO_LOG_LEVEL = 'silly'
    const aioLogger = AioLogger('App', { provider: 'debug' })
    const message = 'message'

    aioLogger.error(message)
    aioLogger.warn(message)
    aioLogger.info(message)
    aioLogger.verbose(message)
    aioLogger.debug(message)
    aioLogger.silly(message)
    aioLogger.close()

    expect(global.console.log).toHaveBeenCalledTimes(0) // no match
  })

  test('with string substitution and DEBUG=App', () => {
    process.env.DEBUG = 'App'
    process.env.AIO_LOG_LEVEL = 'debug'

    const aioLogger = AioLogger('App', { provider: 'debug' })
    const json = { foo: 'bar' }
    aioLogger.info('message %s %s %d %f %j', 'hello', 'world', 123, 123.456, json)

    expect(global.console.log).toHaveBeenLastCalledWith(
      expect.stringContaining('message hello world 123 123.456 {"foo":"bar"}')
    )
  })

  test('json objects and DEBUG=App', () => {
    process.env.DEBUG = 'App'
    process.env.AIO_LOG_LEVEL = 'debug'

    const aioLogger = AioLogger('App', { provider: 'debug' })
    aioLogger.info({ foo: 'bar' })

    expect(global.console.log).toHaveBeenLastCalledWith(
      expect.stringContaining("{ foo: 'bar' }")
    )
  })
})

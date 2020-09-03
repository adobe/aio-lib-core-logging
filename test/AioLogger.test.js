/*
Copyright 2019 Adobe. All rights reserved.
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

global.console = { log: jest.fn() }

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

test('Winston', async () => {
  process.env.__OW_ACTION_NAME = 'fake-action'
  fs.removeSync('./logfile.txt')
  fs.closeSync(fs.openSync('./logfile.txt', 'w'))
  let aioLogger = AioLogger()
  aioLogger.error('message')
  aioLogger.warn('message')
  aioLogger.info('message')
  aioLogger.verbose('message')
  aioLogger.debug('message')
  aioLogger.silly('message')
  aioLogger.close()
  expect(global.console.log).toHaveBeenCalledTimes(3)
  expect(global.console.log).toHaveBeenLastCalledWith(expect.stringContaining('[AIO fake-action] info: message'))

  aioLogger = AioLogger('App', { transports: './logfile.txt', logSourceAction: false })
  aioLogger.error('logfile')
  aioLogger.close()
  function getLog () {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        const log = fs.readFileSync('./logfile.txt', 'utf8')
        fs.removeSync('./logfile.txt')
        resolve(log)
      }, 1000)
    })
  }
  expect(await getLog()).toContain('[App] error: logfile')

  const winston = require('winston')
  aioLogger = AioLogger('App', { transports: [new winston.transports.File({ filename: './logfile.txt' })], logSourceAction: false })
  aioLogger.error('logfile')
  aioLogger.close()
  expect(await getLog()).toContain('[App] error: logfile')
})

test('bad provider', async () => {
  expect.hasAssertions()

  const provider = '__a_surely_not_supported_provider1234'
  const expectedError = new Error(`log provider ${provider} is not supported, use one of [winston, debug]`)
  const func = () => AioLogger('App', { provider })

  expect(func).toThrow(expectedError)
})

test('with Winston', () => {
  process.env.AIO_LOG_LEVEL = 'error'
  const aioLogger = AioLogger('App')
  aioLogger.error('message')
  aioLogger.info('message')
  expect(global.console.log).toHaveBeenCalledTimes(1)
})

test('with Debug and DEBUG=*', () => {
  process.env.DEBUG = '*'
  const aioLogger = AioLogger('App', { provider: 'debug' })
  aioLogger.error('message')
  aioLogger.warn('message')
  aioLogger.info('message')
  aioLogger.verbose('message')
  aioLogger.debug('message')
  aioLogger.silly('message')
  aioLogger.close()
  expect(global.console.log).toHaveBeenCalledTimes(6)
})
test('with Debug and DEBUG=App:*', () => {
  process.env.DEBUG = 'App:*'
  const aioLogger = AioLogger('App', { provider: 'debug' })
  aioLogger.error('message')
  aioLogger.warn('message')
  aioLogger.info('message')
  aioLogger.verbose('message')
  aioLogger.debug('message')
  aioLogger.silly('message')
  aioLogger.close()
  expect(global.console.log).toHaveBeenCalledTimes(6)
})
test('with Debug and DEBUG=App*', () => {
  process.env.DEBUG = 'App*'
  const aioLogger = AioLogger('App', { provider: 'debug' })
  aioLogger.error('message')
  aioLogger.warn('message')
  aioLogger.info('message')
  aioLogger.verbose('message')
  aioLogger.debug('message')
  aioLogger.silly('message')
  aioLogger.close()
  expect(global.console.log).toHaveBeenCalledTimes(6)
})
test('with Debug and DEBUG=Ap*', () => {
  process.env.DEBUG = 'Ap*'
  const aioLogger = AioLogger('App', { provider: 'debug' })
  aioLogger.error('message')
  aioLogger.warn('message')
  aioLogger.info('message')
  aioLogger.verbose('message')
  aioLogger.debug('message')
  aioLogger.silly('message')
  aioLogger.close()
  expect(global.console.log).toHaveBeenCalledTimes(6)
})
test('with Debug and DEBUG=App and AIO_LOG_LEVEL', () => {
  process.env.DEBUG = 'App'
  const aioLogger = AioLogger('App', { provider: 'debug' })
  aioLogger.error('message')
  aioLogger.warn('message')
  aioLogger.info('message')
  aioLogger.verbose('message')
  aioLogger.debug('message')
  aioLogger.silly('message')
  aioLogger.close()
  // info, warn, error
  expect(global.console.log).toHaveBeenCalledTimes(3)
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('error'))
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('warn'))
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('info'))
})
test('with Debug and DEBUG=App and AIO_LOG_LEVEL=error', () => {
  process.env.DEBUG = 'App'
  process.env.AIO_LOG_LEVEL = 'error'
  const aioLogger = AioLogger('App', { provider: 'debug' })
  aioLogger.error('message')
  aioLogger.warn('message')
  aioLogger.info('message')
  aioLogger.verbose('message')
  aioLogger.debug('message')
  aioLogger.silly('message')
  aioLogger.close()
  expect(global.console.log).toHaveBeenCalledTimes(1)
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('error'))
})
test('with Debug and DEBUG=App and AIO_LOG_LEVEL=warn', () => {
  process.env.DEBUG = 'App'
  process.env.AIO_LOG_LEVEL = 'warn'
  const aioLogger = AioLogger('App', { provider: 'debug' })
  aioLogger.error('message')
  aioLogger.warn('message')
  aioLogger.info('message')
  aioLogger.verbose('message')
  aioLogger.debug('message')
  aioLogger.silly('message')
  aioLogger.close()
  expect(global.console.log).toHaveBeenCalledTimes(2)
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('error'))
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('warn'))
})
test('with Debug and DEBUG=App and AIO_LOG_LEVEL=info', () => {
  process.env.DEBUG = 'App'
  process.env.AIO_LOG_LEVEL = 'info'
  const aioLogger = AioLogger('App', { provider: 'debug' })
  aioLogger.error('message')
  aioLogger.warn('message')
  aioLogger.info('message')
  aioLogger.verbose('message')
  aioLogger.debug('message')
  aioLogger.silly('message')
  aioLogger.close()
  expect(global.console.log).toHaveBeenCalledTimes(3)
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('error'))
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('warn'))
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('info'))
})
test('with Debug and DEBUG=App and default AIO_LOG_LEVEL=verbose', () => {
  process.env.DEBUG = 'App'
  process.env.AIO_LOG_LEVEL = 'verbose'
  const aioLogger = AioLogger('App', { provider: 'debug' })
  aioLogger.error('message')
  aioLogger.warn('message')
  aioLogger.info('message')
  aioLogger.verbose('message')
  aioLogger.debug('message')
  aioLogger.silly('message')
  aioLogger.close()
  expect(global.console.log).toHaveBeenCalledTimes(4)
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('error'))
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('warn'))
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('info'))
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('verbose'))
})

test('with Debug and DEBUG=App and AIO_LOG_LEVEL=debug', () => {
  process.env.DEBUG = 'App'
  process.env.AIO_LOG_LEVEL = 'debug'
  const aioLogger = AioLogger('App', { provider: 'debug' })
  aioLogger.error('message')
  aioLogger.warn('message')
  aioLogger.info('message')
  aioLogger.verbose('message')
  aioLogger.debug('message')
  aioLogger.silly('message')
  aioLogger.close()
  expect(global.console.log).toHaveBeenCalledTimes(5)
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('error'))
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('warn'))
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('info'))
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('verbose'))
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('debug'))
})

test('with Debug and DEBUG=App:debug and AIO_LOG_LEVEL=error', () => {
  // here the log level is ignored and only debug logs will be shown
  process.env.DEBUG = 'App:debug'
  process.env.AIO_LOG_LEVEL = 'error'
  const aioLogger = AioLogger('App', { provider: 'debug' })
  aioLogger.error('message')
  aioLogger.warn('message')
  aioLogger.info('message')
  aioLogger.verbose('message')
  aioLogger.debug('message')
  aioLogger.silly('message')
  aioLogger.close()
  expect(global.console.log).toHaveBeenCalledTimes(1)
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('debug'))
})

test('with Debug and DEBUG=App:warn and AIO_LOG_LEVEL=silly', () => {
  // here the log level is ignored and only error logs will be shown
  process.env.DEBUG = 'App:warn'
  process.env.AIO_LOG_LEVEL = 'silly'
  const aioLogger = AioLogger('App', { provider: 'debug' })
  aioLogger.error('message')
  aioLogger.warn('message')
  aioLogger.info('message')
  aioLogger.verbose('message')
  aioLogger.debug('message')
  aioLogger.silly('message')
  aioLogger.close()
  expect(global.console.log).toHaveBeenCalledTimes(1)
  expect(global.console.log).toHaveBeenCalledWith(expect.stringContaining('warn'))
})

test('with Debug and DEBUG=App and AIO_LOG_LEVEL=silly', () => {
  process.env.DEBUG = 'App'
  process.env.AIO_LOG_LEVEL = 'silly'
  const aioLogger = AioLogger('App', { provider: 'debug' })
  aioLogger.error('message')
  aioLogger.warn('message')
  aioLogger.info('message')
  aioLogger.verbose('message')
  aioLogger.debug('message')
  aioLogger.silly('message')
  aioLogger.close()
  expect(global.console.log).toHaveBeenCalledTimes(6)
})
test('with Debug and DEBUG=Ap', () => {
  process.env.DEBUG = 'Ap'
  process.env.AIO_LOG_LEVEL = 'silly'
  const aioLogger = AioLogger('App', { provider: 'debug' })
  aioLogger.error('message')
  aioLogger.warn('message')
  aioLogger.info('message')
  aioLogger.verbose('message')
  aioLogger.debug('message')
  aioLogger.silly('message')
  aioLogger.close()
  expect(global.console.log).toHaveBeenCalledTimes(0)
})
test('with Debug and DEBUG=Appnot', () => {
  process.env.DEBUG = 'Apnot'
  process.env.AIO_LOG_LEVEL = 'silly'
  const aioLogger = AioLogger('App', { provider: 'debug' })
  aioLogger.error('message')
  aioLogger.warn('message')
  aioLogger.info('message')
  aioLogger.verbose('message')
  aioLogger.debug('message')
  aioLogger.silly('message')
  aioLogger.close()
  expect(global.console.log).toHaveBeenCalledTimes(0)
})

test('debug with string substitution and DEBUG=App', () => {
  process.env.DEBUG = 'App'
  process.env.AIO_LOG_LEVEL = 'debug'
  const aioLogger = AioLogger('App', { provider: 'debug' })
  aioLogger.info('message %s %s %d', 'hello', 'world', 123)
  expect(global.console.log).toHaveBeenLastCalledWith(
    expect.stringContaining('message hello world 123')
  )
})

test('winston debug with string substitution and file transport', async () => {
  // change-me: do not hit real file system and do not wait

  fs.removeSync('./logfile.txt')
  fs.closeSync(fs.openSync('./logfile.txt', 'w'))
  const aioLogger = AioLogger('App', { transports: './logfile.txt', logSourceAction: false })
  aioLogger.info('message %s %s %d', 'hello', 'world', 123)
  aioLogger.close()
  async function getLog () {
    await new Promise((resolve, reject) => setTimeout(resolve, 100))
    const log = fs.readFileSync('./logfile.txt', 'utf8')
    fs.removeSync('./logfile.txt')
    return log
  }
  expect(await getLog()).toContain('message hello world 123')
})

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

afterEach(() => {
  jest.clearAllMocks()
  delete process.env.__OW_ACTION_NAME
  delete process.env.DEBUG
})

describe('config', () => {
  test('when using defaults', () => {
    const aioLogger = AioLogger('App')

    expect(aioLogger.config.provider).toEqual('./WinstonLogger')
    expect(aioLogger.config.level).toEqual('info')
    expect(aioLogger.config.logSourceAction).toEqual(false)
    expect(aioLogger.config.transports).toEqual(undefined)
    expect(aioLogger.config.silent).toEqual(false)
  })
  test('when using defaults and __OW_ACTION_NAME is set', () => {
    process.env.__OW_ACTION_NAME = 'fake-action'
    const aioLogger = AioLogger('App')

    expect(aioLogger.config.provider).toEqual('./WinstonLogger')
    expect(aioLogger.config.level).toEqual('info')
    expect(aioLogger.config.logSourceAction).toEqual(true)
    expect(aioLogger.config.transports).toEqual(undefined)
    expect(aioLogger.config.silent).toEqual(false)
  })
  test('when __OW_ACTION_NAME is set and config.logSourceAction = false', () => {
    process.env.__OW_ACTION_NAME = 'fake-action'
    const aioLogger = AioLogger('App', { logSourceAction: false })

    expect(aioLogger.config.provider).toEqual('./WinstonLogger')
    expect(aioLogger.config.level).toEqual('info')
    expect(aioLogger.config.logSourceAction).toEqual(false)
    expect(aioLogger.config.transports).toEqual(undefined)
    expect(aioLogger.config.silent).toEqual(false)
  })
})

test('Debug', () => {
  process.env.DEBUG = '*'

  global.console = { log: jest.fn() }
  const aioLogger = AioLogger('App', { provider: './DebugLogger' })
  aioLogger.error('message')
  aioLogger.warn('message')
  aioLogger.info('message')
  aioLogger.verbose('message')
  aioLogger.debug('message')
  aioLogger.silly('message')
  aioLogger.close()
  expect(global.console.log).toHaveBeenCalledTimes(6)
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

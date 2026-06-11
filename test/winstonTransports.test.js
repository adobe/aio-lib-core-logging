/*
Copyright 2026 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const winston = require('winston')
const getWinstonTransports = require('../src/winstonTransports')

describe('getWinstonTransports', () => {
  test('defaults to Console when no argument is passed', () => {
    const transports = getWinstonTransports()
    expect(transports).toHaveLength(1)
    expect(transports[0]).toBeInstanceOf(winston.transports.Console)
  })

  test("returns Console transport for 'console'", () => {
    const transports = getWinstonTransports('console')
    expect(transports).toHaveLength(1)
    expect(transports[0]).toBeInstanceOf(winston.transports.Console)
  })

  test('returns File transport for a file path string', () => {
    const transports = getWinstonTransports('./app.log')
    expect(transports).toHaveLength(1)
    expect(transports[0]).toBeInstanceOf(winston.transports.File)
  })

  test('returns provided transport instances when passed an array', () => {
    const fileTransport = new winston.transports.File({ filename: './app.log' })
    const transports = getWinstonTransports([fileTransport])
    expect(transports).toHaveLength(1)
    expect(transports[0]).toBe(fileTransport)
  })

  test('returns multiple transport instances from an array', () => {
    const t1 = new winston.transports.Console()
    const t2 = new winston.transports.File({ filename: './app.log' })
    const transports = getWinstonTransports([t1, t2])
    expect(transports).toHaveLength(2)
    expect(transports[0]).toBe(t1)
    expect(transports[1]).toBe(t2)
  })
})

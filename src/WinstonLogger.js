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
const winston = require('winston')
const { combine, timestamp, label } = winston.format
const DEFAULT_DEST = 'console'

class WinstonLogger {
  constructor (config) {
    this.config = config
    this.logger = winston.createLogger({
      level: config.level,
      format: combine(
        label({ label: config.label }),
        timestamp(),
        this.getWinstonFormat()
      ),
      transports: this.getWinstonTransports(config.transports || DEFAULT_DEST),
      silent: config.silent
    })
  }

  getWinstonFormat () {
    return winston.format.printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`
    })
  }

  getWinstonTransports (transports) {
    const wTransports = []
    switch (transports) {
      case 'console':
        wTransports.push(new winston.transports.Console())
        break
      case 'aiologcollector':
        console.log('added http')
        wTransports.push(new winston.transports.Http({ host: this.config.aioLogCollectorHost , path: this.config.aioLogCollectorPath, ssl: true}))
        break
      default:
        if (typeof (transports) === 'string' && transports.toString().indexOf('.') !== -1) {
          wTransports.push(new winston.transports.File({ filename: transports }))
        } else {
          transports.forEach((t) => wTransports.push(t))
        }
        break
    }
    return wTransports
  }

  close () {
    this.logger.close()
  }

  error (message) {
    this.logger.error(message)
  }

  warn (message) {
    this.logger.warn(message)
  }

  info (message) {
    this.logger.info(message)
  }

  verbose (message) {
    this.logger.verbose(message)
  }

  debug (message) {
    this.logger.debug(message)
  }

  silly (message) {
    this.logger.silly(message)
  }
}

module.exports = WinstonLogger

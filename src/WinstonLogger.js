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
const { combine, timestamp, label, splat } = winston.format
const DEFAULT_DEST = 'console'

class WinstonLogger {
  constructor (config) {
    this.config = config
    this.logger = winston.createLogger({
      level: config.level,
      format: combine(
        label({ label: config.label }),
        splat(),
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

  error (...args) {
    this.logger.error(...args)
  }

  warn (...args) {
    this.logger.warn(...args)
  }

  info (...args) {
    this.logger.info(...args)
  }

  verbose (...args) {
    this.logger.verbose(...args)
  }

  debug (...args) {
    this.logger.debug(...args)
  }

  silly (...args) {
    this.logger.silly(...args)
  }
}

module.exports = WinstonLogger

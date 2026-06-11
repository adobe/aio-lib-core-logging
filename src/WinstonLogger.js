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
const util = require('node:util')
const { combine, timestamp, label, splat } = winston.format
const getWinstonTransports = require('./winstonTransports')

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
      transports: getWinstonTransports(config.transports),
      silent: config.silent
    })
  }

  getWinstonFormat () {
    return winston.format.printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`
    })
  }

  close () {
    this.logger.close()
  }

  error (...args) {
    this.logger.error(util.format(...args))
  }

  warn (...args) {
    this.logger.warn(util.format(...args))
  }

  info (...args) {
    this.logger.info(util.format(...args))
  }

  verbose (...args) {
    this.logger.verbose(util.format(...args))
  }

  debug (...args) {
    this.logger.debug(util.format(...args))
  }

  silly (...args) {
    this.logger.silly(util.format(...args))
  }
}

module.exports = WinstonLogger

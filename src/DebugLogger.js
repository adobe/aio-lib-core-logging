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
const debug = require('debug')

class DebugLogger {
  constructor (config) {
    this.config = config
    debug.formatters.s = this.getFormat()
    debug.log = this.getDestination()
    this.errorLogger = debug(config.label).extend('error')
    this.warnLogger = debug(config.label).extend('warn')
    this.infoLogger = debug(config.label).extend('info')
    this.verboseLogger = debug(config.label).extend('verbose')
    this.debugLogger = debug(config.label).extend('debug')
    this.sillyLogger = debug(config.label).extend('silly')
  }

  getFormat () {
    return (message) => {
      return message
    }
  }

  getDestination () {
    return (message) => {
      console.log(message)
    }
  }

  close () {
    // TODO
  }

  error (message) {
    this.errorLogger('%s', message)
  }

  warn (message) {
    this.warnLogger('%s', message)
  }

  info (message) {
    this.infoLogger('%s', message)
  }

  verbose (message) {
    this.verboseLogger('%s', message)
  }

  debug (message) {
    this.debugLogger('%s', message)
  }

  silly (message) {
    this.sillyLogger('%s', message)
  }
}

module.exports = DebugLogger

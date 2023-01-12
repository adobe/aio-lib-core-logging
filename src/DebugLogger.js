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
const util = require('node:util')

class DebugLogger {
  constructor (config) {
    this.config = config
    debug.log = this.getDestination()
    // make sure to always take into account the latest DEBUG env var
    debug.enable(process.env.DEBUG)
    if (debug.enabled(this.config.label)) {
      // => if we are here it means process.env.DEBUG === this.config.label
      // (`${this.config.label}*` will also match the condition but it will set all log levels anyways)
      // if let's say process.env.DEBUG === `${this.config.label}:debug` then we won't get
      // into this branch and only debug logs will be shown
      debug.enable(this.getDebugLevel())
    }
    this.errorLogger = debug(config.label).extend('error')
    this.warnLogger = debug(config.label).extend('warn')
    this.infoLogger = debug(config.label).extend('info')
    this.verboseLogger = debug(config.label).extend('verbose')
    this.debugLogger = debug(config.label).extend('debug')
    this.sillyLogger = debug(config.label).extend('silly')
  }

  getDestination () {
    return (message) => {
      console.log(message)
    }
  }

  getDebugLevel () {
    let debugLevel
    const label = this.config.label
    switch (this.config.level) {
      case 'error' :
        debugLevel = label + ':error'
        break
      case 'warn' :
        debugLevel = label + ':error,' + label + ':warn'
        break
      case 'info' :
        debugLevel = label + ':error,' + label + ':warn,' + label + ':info'
        break
      case 'verbose' :
        debugLevel = label + ':error,' + label + ':warn,' + label + ':info,' + label + ':verbose'
        break
      case 'debug' :
        debugLevel = label + ':error,' + label + ':warn,' + label + ':info,' + label + ':verbose,' + label + ':debug'
        break
      case 'silly' :
        debugLevel = label + ':*'
        break
    }
    return process.env.DEBUG + ',' + debugLevel
  }

  close () {
    // TODO
  }

  error (...args) {
    this.errorLogger(util.format(...args))
  }

  warn (...args) {
    this.warnLogger(util.format(...args))
  }

  info (...args) {
    this.infoLogger(util.format(...args))
  }

  verbose (...args) {
    this.verboseLogger(util.format(...args))
  }

  debug (...args) {
    this.debugLogger(util.format(...args))
  }

  silly (...args) {
    this.sillyLogger(util.format(...args))
  }
}

module.exports = DebugLogger

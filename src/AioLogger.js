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

const DEFAULT_PROVIDER = 'winston'
const DEFAULT_LEVEL = 'info'
const DEFAULT_LABEL = 'AIO'

/**
 * @module @adobe/aio-lib-core-logging
 */

/**
 * configuration for the log framework
 *
 * @typedef AioLoggerConfig
 * @type {object}
 * @property {string} [level] logging level for winston, defaults to info
 * @property {string} [transports] transport config for winston, defaults to undefined
 * @property {boolean} [silent] silent config for winston, defaults to false
 * @property {string} [provider] defaults to winston, can be set to either 'winston' or 'debug'
 * @property {boolean} [logSourceAction] defaults to true if __OW_ACTION_NAME is set otherwise defaults to false. If
 * running in an action set logSourceAction to false if you do not want to log the action name.
 */

/**
* This class provides a logging framework with pluggable logging provider.
* Winston is used by default.
*/
class AioLogger {
  /** Constructor
  *
  * @param {string} moduleName  module name to be included with the log message.
  * @param {AioLoggerConfig} [config={}] for the log framework.
  */
  constructor (moduleName, config = {}) {
    this.setDefaults(moduleName, config)
    if (this.config.provider === 'winston') this.LogProvider = require('./WinstonLogger')
    else if (this.config.provider === 'debug') this.LogProvider = require('./DebugLogger')
    else throw new Error(`log provider ${this.config.provider} is not supported, use one of [winston, debug]`)
    this.logger = new this.LogProvider(this.config)
  }

  setDefaults (moduleName, config) {
    this.config = {}
    this.config.level = process.env.AIO_LOG_LEVEL || config.level || DEFAULT_LEVEL
    this.config.provider = config.provider || DEFAULT_PROVIDER
    // config.logSourceAction will only be TRUE if both  __OW_ACTION_NAME env var is set
    // and config.logSourceAction is not false
    this.config.logSourceAction = !!process.env.__OW_ACTION_NAME && config.logSourceAction !== false
    this.config.label = this.generateLabel(moduleName, this.config)
    this.config.silent = config.silent || false
    this.config.transports = config.transports
  }

  generateLabel (moduleName, config) {
    const label = moduleName || DEFAULT_LABEL
    const sourceAction = process.env.__OW_ACTION_NAME
    const sourceLabel = config.logSourceAction ? ' ' + sourceAction : ''
    return label + sourceLabel
  }

  /** Close the logger. Useful when writing logs to a file or stream.
  *
  */
  close () {
    this.logger.close()
  }

  /** log error message.
  *
  * @param {...(object|string)} [data] data to be logged. Prints to the logger with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf(3) (the arguments are all passed to util.format()).
  */
  error (...data) {
    this.logger.error(...data)
  }

  /** log warn message.
  *
  * @param {...(object|string)} [data] data to be logged. Prints to the logger with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf(3) (the arguments are all passed to util.format()).
  */
  warn (...data) {
    this.logger.warn(...data)
  }

  /** log info message.
  *
  * @param {...(object|string)} [data] data to be logged. Prints to the logger with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf(3) (the arguments are all passed to util.format()).
  */
  info (...data) {
    this.logger.info(...data)
  }

  /**
   * log message (equivalent to info)
   * @param {...(object|string)} [data] data to be logged. Prints to the logger with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf(3) (the arguments are all passed to util.format()).
   */
  log (...data) {
    this.logger.info(...data)
  }

  /** log verbose message.
  *
   * @param {...(object|string)} [data] data to be logged. Prints to the logger with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf(3) (the arguments are all passed to util.format()).
  */
  verbose (...data) {
    this.logger.verbose(...data)
  }

  /** log debug message.
  *
   * @param {...(object|string)} [data] data to be logged. Prints to the logger with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf(3) (the arguments are all passed to util.format()).
  */
  debug (...data) {
    this.logger.debug(...data)
  }

  /** log silly message.
  *
   * @param {...(object|string)} [data] data to be logged. Prints to the logger with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf(3) (the arguments are all passed to util.format()).
  */
  silly (...data) {
    this.logger.silly(...data)
  }
}

/**
  * Creates a new AioLogger instance.
  *
  * @param moduleName {string} module name to be included with the log message.
  * @param [config={}] {AioLoggerConfig} configuration for the log framework.
  * @function
 */
module.exports = function (moduleName, config) {
  return new AioLogger(moduleName, config)
}

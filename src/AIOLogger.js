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

const DEFAULT_PROVIDER = './WinstonLogger'
const DEFAULT_LEVEL = 'info'
const DEFAULT_LABEL = 'AIO'

/**
* This class provides a logging framework with pluggable logging provider.
* Winston is used by default.
*/
class AIOLogger {
  /** Constructor
  *
  * @param moduleName {string} module name to be included with the log message.
  * @param config {string} configuration for the log framework.
  */
  constructor (moduleName, config = {}) {
    config = this.setDefaults(moduleName, config)
    this.LogProvider = require(config.provider)
    this.logger = new this.LogProvider(config)
  }

  setDefaults (moduleName, config) {
    config.level = config.level || DEFAULT_LEVEL
    config.provider = config.provider || DEFAULT_PROVIDER
    config.logSourceAction = config.logSourceAction === undefined ? true : config.logSourceAction
    config.label = this.generateLabel(moduleName, config)
    return config
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
  * @param message {string} message to be logged.
  */
  error (message) {
    this.logger.error(message)
  }

  /** log warn message.
  *
  * @param message {string} message to be logged.
  */
  warn (message) {
    this.logger.warn(message)
  }

  /** log info message.
  *
  * @param message {string} message to be logged.
  */
  info (message) {
    this.logger.info(message)
  }

  /** log verbose message.
  *
  * @param message {string} message to be logged.
  */
  verbose (message) {
    this.logger.verbose(message)
  }

  /** log debug message.
  *
  * @param message {string} message to be logged.
  */
  debug (message) {
    this.logger.debug(message)
  }

  /** log silly message.
  *
  * @param message {string} message to be logged.
  */
  silly (message) {
    this.logger.silly(message)
  }
}
module.exports = function (moduleName, config) { return new AIOLogger(moduleName, config) }

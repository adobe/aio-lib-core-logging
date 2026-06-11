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
const DEFAULT_DEST = 'console'

function getWinstonTransports (transports = DEFAULT_DEST) {
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

module.exports = getWinstonTransports

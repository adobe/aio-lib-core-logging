/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const util = require('node:util')

function countFormatSpecifiers (str) {
  if (typeof (str) !== 'string') {
    return 0
  }

  // from node.js util.format
  const formatSpecifiers = ['%s', '%d', '%i', '%f', '%j', '%o', '%O']

  const counts = formatSpecifiers.map(specifier => {
    const regex = new RegExp(specifier, 'g')
    return (str.match(regex) || []).length
  })

  // sum all counts
  return counts.reduce((acc, i) => acc + i, 0)
}

function arraySplit (arr, midIndex) {
  const left = arr.slice(0, midIndex)
  const right = arr.slice(midIndex)

  return [left, right]
}

function formatter (target, current, ...rest) {
  if (!current) { // only first arg available
    return [target]
  }

  const numberOfSpecifiers = countFormatSpecifiers(target)
  if (numberOfSpecifiers === 0) {
    return [target, current, ...rest]
  } else {
    const formatArgs = arraySplit([current, ...rest], numberOfSpecifiers)
    // only take numberOfSpecifier args, push the rest to the result
    const result = [util.format(target, ...formatArgs[0]), ...formatArgs[1]]
    return formatter(...result)
  }
}

function printer (...args) {
  // map objects to their string equivalents
  const m = args.map(arg => {
    if (typeof (arg) !== 'string') {
      return util.inspect(arg)
    }
    return arg
  })

  // we emulate console.log, where all args are joined by a space
  return m.join(' ')
}

function variadicToString (first, ...rest) {
  // algorithm based on https://console.spec.whatwg.org/#log
  if (!first) {
    return
  }

  if (rest.length === 0) {
    return printer(first)
  } else {
    return printer(...formatter(first, ...rest))
  }
}

module.exports = {
  variadicToString
}

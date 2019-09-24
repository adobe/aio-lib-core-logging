<a name="module_@adobe/aio-lib-core-logging"></a>

## @adobe/aio-lib-core-logging

* [@adobe/aio-lib-core-logging](#module_@adobe/aio-lib-core-logging)
    * [module.exports(moduleName, config)](#exp_module_@adobe/aio-lib-core-logging--module.exports) ⏏
        * [~AioLogger](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)
            * [new AioLogger(moduleName, config)](#new_module_@adobe/aio-lib-core-logging--module.exports..AioLogger_new)
            * [.close()](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+close)
            * [.error(message)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+error)
            * [.warn(message)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+warn)
            * [.info(message)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+info)
            * [.verbose(message)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+verbose)
            * [.debug(message)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+debug)
            * [.silly(message)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+silly)

<a name="exp_module_@adobe/aio-lib-core-logging--module.exports"></a>

### module.exports(moduleName, config) ⏏
Creates a new AioLogger instance.

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| moduleName | <code>string</code> | module name to be included with the log message. |
| config | <code>string</code> | configuration for the log framework. |

<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLogger"></a>

#### module.exports~AioLogger
This class provides a logging framework with pluggable logging provider.
Winston is used by default.

**Kind**: inner class of [<code>module.exports</code>](#exp_module_@adobe/aio-lib-core-logging--module.exports)  

* [~AioLogger](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)
    * [new AioLogger(moduleName, config)](#new_module_@adobe/aio-lib-core-logging--module.exports..AioLogger_new)
    * [.close()](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+close)
    * [.error(message)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+error)
    * [.warn(message)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+warn)
    * [.info(message)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+info)
    * [.verbose(message)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+verbose)
    * [.debug(message)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+debug)
    * [.silly(message)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+silly)

<a name="new_module_@adobe/aio-lib-core-logging--module.exports..AioLogger_new"></a>

##### new AioLogger(moduleName, config)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| moduleName | <code>string</code> | module name to be included with the log message. |
| config | <code>string</code> | configuration for the log framework. |

<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLogger+close"></a>

##### aioLogger.close()
Close the logger. Useful when writing logs to a file or stream.

**Kind**: instance method of [<code>AioLogger</code>](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)  
<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLogger+error"></a>

##### aioLogger.error(message)
log error message.

**Kind**: instance method of [<code>AioLogger</code>](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | message to be logged. |

<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLogger+warn"></a>

##### aioLogger.warn(message)
log warn message.

**Kind**: instance method of [<code>AioLogger</code>](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | message to be logged. |

<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLogger+info"></a>

##### aioLogger.info(message)
log info message.

**Kind**: instance method of [<code>AioLogger</code>](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | message to be logged. |

<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLogger+verbose"></a>

##### aioLogger.verbose(message)
log verbose message.

**Kind**: instance method of [<code>AioLogger</code>](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | message to be logged. |

<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLogger+debug"></a>

##### aioLogger.debug(message)
log debug message.

**Kind**: instance method of [<code>AioLogger</code>](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | message to be logged. |

<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLogger+silly"></a>

##### aioLogger.silly(message)
log silly message.

**Kind**: instance method of [<code>AioLogger</code>](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | message to be logged. |


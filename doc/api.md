<a name="module_@adobe/aio-lib-core-logging"></a>

## @adobe/aio-lib-core-logging

* [@adobe/aio-lib-core-logging](#module_@adobe/aio-lib-core-logging)
    * [module.exports(moduleName, [config&#x3D;])](#exp_module_@adobe/aio-lib-core-logging--module.exports) ⏏
        * [~AioLogger](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)
            * [new AioLogger(moduleName, [config])](#new_module_@adobe/aio-lib-core-logging--module.exports..AioLogger_new)
            * [.close()](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+close)
            * [.error(...messages)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+error)
            * [.warn(...messages)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+warn)
            * [.info(...messages)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+info)
            * [.log(...messages)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+log)
            * [.verbose(...messages)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+verbose)
            * [.debug(...messages)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+debug)
            * [.silly(...messages)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+silly)
        * [~AioLoggerConfig](#module_@adobe/aio-lib-core-logging--module.exports..AioLoggerConfig) : <code>object</code>

<a name="exp_module_@adobe/aio-lib-core-logging--module.exports"></a>

### module.exports(moduleName, [config&#x3D;]) ⏏
Creates a new AioLogger instance.

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| moduleName | <code>string</code> | module name to be included with the log message. |
| [config=] |  | {AioLoggerConfig} configuration for the log framework. |

<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLogger"></a>

#### module.exports~AioLogger
This class provides a logging framework with pluggable logging provider.
Winston is used by default.

**Kind**: inner class of [<code>module.exports</code>](#exp_module_@adobe/aio-lib-core-logging--module.exports)  

* [~AioLogger](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)
    * [new AioLogger(moduleName, [config])](#new_module_@adobe/aio-lib-core-logging--module.exports..AioLogger_new)
    * [.close()](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+close)
    * [.error(...messages)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+error)
    * [.warn(...messages)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+warn)
    * [.info(...messages)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+info)
    * [.log(...messages)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+log)
    * [.verbose(...messages)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+verbose)
    * [.debug(...messages)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+debug)
    * [.silly(...messages)](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger+silly)

<a name="new_module_@adobe/aio-lib-core-logging--module.exports..AioLogger_new"></a>

##### new AioLogger(moduleName, [config])
Constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| moduleName | <code>string</code> |  | module name to be included with the log message. |
| [config] | <code>AioLoggerConfig</code> | <code>{}</code> | for the log framework. |

<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLogger+close"></a>

##### aioLogger.close()
Close the logger. Useful when writing logs to a file or stream.

**Kind**: instance method of [<code>AioLogger</code>](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)  
<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLogger+error"></a>

##### aioLogger.error(...messages)
log error message.

**Kind**: instance method of [<code>AioLogger</code>](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)  

| Param | Type | Description |
| --- | --- | --- |
| ...messages | <code>string</code> | message to be logged. |

<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLogger+warn"></a>

##### aioLogger.warn(...messages)
log warn message.

**Kind**: instance method of [<code>AioLogger</code>](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)  

| Param | Type | Description |
| --- | --- | --- |
| ...messages | <code>string</code> | message to be logged. |

<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLogger+info"></a>

##### aioLogger.info(...messages)
log info message.

**Kind**: instance method of [<code>AioLogger</code>](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)  

| Param | Type | Description |
| --- | --- | --- |
| ...messages | <code>string</code> | message to be logged. |

<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLogger+log"></a>

##### aioLogger.log(...messages)
log info message.

**Kind**: instance method of [<code>AioLogger</code>](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)  

| Param | Type | Description |
| --- | --- | --- |
| ...messages | <code>string</code> | message to be logged. |

<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLogger+verbose"></a>

##### aioLogger.verbose(...messages)
log verbose message.

**Kind**: instance method of [<code>AioLogger</code>](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)  

| Param | Type | Description |
| --- | --- | --- |
| ...messages | <code>string</code> | message to be logged. |

<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLogger+debug"></a>

##### aioLogger.debug(...messages)
log debug message.

**Kind**: instance method of [<code>AioLogger</code>](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)  

| Param | Type | Description |
| --- | --- | --- |
| ...messages | <code>string</code> | message to be logged. |

<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLogger+silly"></a>

##### aioLogger.silly(...messages)
log silly message.

**Kind**: instance method of [<code>AioLogger</code>](#module_@adobe/aio-lib-core-logging--module.exports..AioLogger)  

| Param | Type | Description |
| --- | --- | --- |
| ...messages | <code>string</code> | message to be logged. |

<a name="module_@adobe/aio-lib-core-logging--module.exports..AioLoggerConfig"></a>

#### module.exports~AioLoggerConfig : <code>object</code>
configuration for the log framework

**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_@adobe/aio-lib-core-logging--module.exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [level] | <code>string</code> | logging level for winston, defaults to info |
| [transports] | <code>string</code> | transport config for winston, defaults to undefined |
| [silent] | <code>boolean</code> | silent config for winston, defaults to false |
| [provider] | <code>string</code> | defaults to winston, can be set to either 'winston' or 'debug' |
| [logSourceAction] | <code>boolean</code> | defaults to true if __OW_ACTION_NAME is set otherwise defaults to false. If running in an action set logSourceAction to false if you do not want to log the action name. |


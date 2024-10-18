declare namespace _exports {
    export { AioLoggerConfig };
}
declare function _exports(moduleName: string, config?: AioLoggerConfig): AioLogger;
export = _exports;
/**
 * configuration for the log framework
 */
type AioLoggerConfig = {
    /**
     * logging level for winston, defaults to info
     */
    level?: string;
    /**
     * transport config for winston, defaults to undefined
     */
    transports?: string;
    /**
     * silent config for winston, defaults to false
     */
    silent?: boolean;
    /**
     * defaults to winston, can be set to either 'winston' or 'debug'
     */
    provider?: string;
    /**
     * defaults to true if __OW_ACTION_NAME is set otherwise defaults to false. If
     * running in an action set logSourceAction to false if you do not want to log the action name.
     */
    logSourceAction?: boolean;
};
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
declare class AioLogger {
    /** Constructor
    *
    * @param {string} moduleName  module name to be included with the log message.
    * @param {AioLoggerConfig} [config={}] for the log framework.
    */
    constructor(moduleName: string, config?: AioLoggerConfig);
    LogProvider: typeof import("./WinstonLogger") | typeof import("./DebugLogger");
    logger: import("./WinstonLogger") | import("./DebugLogger");
    setDefaults(moduleName: any, config: any): void;
    config: {};
    generateLabel(moduleName: any, config: any): string;
    /** Close the logger. Useful when writing logs to a file or stream.
    *
    */
    close(): void;
    /** log error message.
    *
    * @param {...(object|string)} [data] data to be logged. Prints to the logger with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf(3) (the arguments are all passed to util.format()).
    */
    error(...data?: (object | string)[]): void;
    /** log warn message.
    *
    * @param {...(object|string)} [data] data to be logged. Prints to the logger with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf(3) (the arguments are all passed to util.format()).
    */
    warn(...data?: (object | string)[]): void;
    /** log info message.
    *
    * @param {...(object|string)} [data] data to be logged. Prints to the logger with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf(3) (the arguments are all passed to util.format()).
    */
    info(...data?: (object | string)[]): void;
    /**
     * log message (equivalent to info)
     * @param {...(object|string)} [data] data to be logged. Prints to the logger with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf(3) (the arguments are all passed to util.format()).
     */
    log(...data?: (object | string)[]): void;
    /** log verbose message.
    *
     * @param {...(object|string)} [data] data to be logged. Prints to the logger with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf(3) (the arguments are all passed to util.format()).
    */
    verbose(...data?: (object | string)[]): void;
    /** log debug message.
    *
     * @param {...(object|string)} [data] data to be logged. Prints to the logger with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf(3) (the arguments are all passed to util.format()).
    */
    debug(...data?: (object | string)[]): void;
    /** log silly message.
    *
     * @param {...(object|string)} [data] data to be logged. Prints to the logger with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf(3) (the arguments are all passed to util.format()).
    */
    silly(...data?: (object | string)[]): void;
}

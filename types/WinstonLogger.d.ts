export = WinstonLogger;
declare class WinstonLogger {
    constructor(config: any);
    config: any;
    logger: winston.Logger;
    getWinstonFormat(): winston.Logform.Format;
    close(): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
    verbose(...args: any[]): void;
    debug(...args: any[]): void;
    silly(...args: any[]): void;
}
import winston = require("winston");

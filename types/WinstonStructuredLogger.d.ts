export = WinstonStructuredLogger;
declare class WinstonStructuredLogger {
    constructor(config: any);
    fields: any;
    logger: winston.Logger;
    close(): void;
    error(...data: any[]): void;
    warn(...data: any[]): void;
    info(...data: any[]): void;
    verbose(...data: any[]): void;
    debug(...data: any[]): void;
    silly(...data: any[]): void;
}
import winston = require("winston");

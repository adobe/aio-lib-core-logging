export = DebugLogger;
declare class DebugLogger {
    constructor(config: any);
    config: any;
    errorLogger: any;
    warnLogger: any;
    infoLogger: any;
    verboseLogger: any;
    debugLogger: any;
    sillyLogger: any;
    getDestination(): (message: any) => void;
    getDebugLevel(): string;
    close(): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
    verbose(...args: any[]): void;
    debug(...args: any[]): void;
    silly(...args: any[]): void;
}

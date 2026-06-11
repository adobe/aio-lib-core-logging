export = getWinstonTransports;
declare function getWinstonTransports(transports?: string): (winston.transports.ConsoleTransportInstance | winston.transports.FileTransportInstance)[];
import winston = require("winston");

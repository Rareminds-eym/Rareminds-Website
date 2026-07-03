/**
 * Logger utility for Cloudflare Functions
 * Provides structured logging with different levels
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: string | number | boolean | null | undefined;
}
class Logger {
  private context: string;
  private enableDebug: boolean;

  constructor(context: string, enableDebug = false) {
    this.context = context;
    this.enableDebug = enableDebug;
  }

  private formatMessage(level: LogLevel, message: string, data?: LogContext): string {
    const timestamp = new Date().toISOString();
    const baseLog = `[${timestamp}] [${level.toUpperCase()}] [${this.context}] ${message}`;
    
    if (data && Object.keys(data).length > 0) {
      try {
        return `${baseLog} ${JSON.stringify(data)}`;
      } catch {
        return `${baseLog} [non-serializable data]`;
      }
    }
    
    return baseLog;
  }

  debug(message: string, data?: LogContext): void {
    if (this.enableDebug) {
      const formattedMessage = this.formatMessage('debug', message, data);
      console.debug(formattedMessage);
    }
  }

  info(message: string, data?: LogContext): void {
    const formattedMessage = this.formatMessage('info', message, data);
    console.info(formattedMessage);
  }

  warn(message: string, data?: LogContext): void {
    console.warn(this.formatMessage('warn', message, data));
  }

  error(message: string, data?: LogContext): void {
    console.error(this.formatMessage('error', message, data));
  }
}

export default Logger;

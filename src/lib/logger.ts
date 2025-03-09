const colors = {
  reset: "\x1b[0m",
  fgRed: "\x1b[31m",
  fgGreen: "\x1b[32m",
  fgYellow: "\x1b[33m",
  fgBlue: "\x1b[34m",
};

export function success(message: string): void {
  console.log(`${colors.fgGreen}Success:${colors.reset} ${message}`);
}

export function error(message: string): void {
  console.log(`${colors.fgRed}Error:${colors.reset} ${message}`);
}

export function info(message: string): void {
  console.log(`${colors.fgBlue}Info:${colors.reset} ${message}`);
}

export function warn(message: string): void {
  console.log(`${colors.fgYellow}Warn:${colors.reset} ${message}`);
}

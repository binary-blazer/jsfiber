import chalk from 'chalk';

export function success(message: string): void {
  console.log(`${chalk.green('Success:')} ${message}`);
}

export function error(message: string): void {
  console.log(`${chalk.red('Error:')} ${message}`);
}

export function info(message: string): void {
  console.log(`${chalk.blue('Info:')} ${message}`);
}

export function warn(message: string): void {
    console.log(`${chalk.yellow('Warn:')} ${message}`);
}
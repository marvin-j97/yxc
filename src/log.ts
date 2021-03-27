export function log(...args: unknown[]): void {
  if (process.env.YXC_DEBUG) {
    console.error(...args);
  }
}

export function log(...args: unknown[]) {
  if (process.env.YXC_DEBUG) {
    console.log(...args);
  }
}

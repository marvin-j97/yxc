import { log } from "../src/log";

// @ts-ignore
if (!process.env_YXC_DEBUG) {
  // @ts-ignore
  process.env.YXC_DEBUG = "yxc";
  log("Running YXC tests");
  // @ts-ignore
  delete process.env.YXC_DEBUG;
}

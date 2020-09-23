import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

const config = {
  input: "build/index.js",
  output: {
    file: "dist/yxc.js",
    format: "umd",
    name: "yxc",
  },
  plugins: [commonjs(), resolve()],
};

export default config;

const babelOptions = {
  presets: ["babel-preset-gatsby"],
  plugins: [[{}]],
}
module.exports = require("babel-jest").createTransformer(babelOptions)

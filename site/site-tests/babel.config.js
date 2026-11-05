module.exports = {
  "plugins": [
    ["@babel/plugin-transform-private-methods", { loose: "false" }],
    ["@babel/plugin-transform-private-property-in-object", { loose: "false" }],
    ["@babel/plugin-transform-class-properties", { loose: "false" }],
  ],
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": "commonjs"
      }
    ],
    "@babel/preset-react"
  ]
}

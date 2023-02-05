const webpack = require("webpack");

module.exports = function override(config, env) {
  config.module.rules = config.module.rules.map((rule) => {
    if (rule.oneOf instanceof Array) {
      return {
        ...rule,
        oneOf: [
          {
            test: /\.m?js$/,
            resolve: {
              fullySpecified: false,
            },
          },
          ...rule.oneOf,
        ],
      };
    }

    return rule;
  });
  //do stuff with the webpack config...
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer"),
  };
  config.resolve.extensions = [
    ...config.resolve.extensions,
    ".ts",
    ".js",
    ".tsx",
    "jsx",
  ];
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ];
  // console.log(config.resolve)
  // console.log(config.plugins)

  return config;
};

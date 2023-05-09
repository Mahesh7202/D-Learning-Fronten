const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "e-learning",
    projectName: "student",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: ["@e-learning/Auth"]
    // modify the webpack config however you'd like to by adding to this object
  });
};

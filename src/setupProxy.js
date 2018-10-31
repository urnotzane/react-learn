const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "http://uat-tc.wlwulian.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      }
    })
  );
  // app.use(proxy("/*.svg", { target: "http://uat-tc.wlwulian.com" }));
};

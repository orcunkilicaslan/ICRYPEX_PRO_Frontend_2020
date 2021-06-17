const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://mobile.guvenlibtc.com:443",
      changeOrigin: true,
    })
  );

  app.use(
    "/web",
    createProxyMiddleware({
      target: "https://www.guvenlibtc.com",
      pathRewrite: {
        "^/web": "",
      },
      changeOrigin: true,
      followRedirects: true,
    })
  );
};

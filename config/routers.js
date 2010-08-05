exports.routers = {
  main: new RegExp("^/$"),
  shorturl: new RegExp("^/s/(.*)$"),
  redirect: new RegExp("^/r/([^/]+)/([^/]+)$")
};

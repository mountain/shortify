exports.routers = {
  main: new RegExp("^/$"),
  shorturl: new RegExp("^/s/([a-z]*)$"),
  redirect: new RegExp("^/r/([a-z]+)/([0-9a-z]+)$")
};

"use strict";
const express = require("express");
const compression = require("compression");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const moment = require("moment");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sessionHelper = require("./util/session-helper");
const bodyParser = require("body-parser");
const expressWs = require("express-ws");
require("./util/add-functions");
const webconfig = require("./webconfig");
global.webconfig = webconfig;
const port = webconfig.port.http || 80;

const routes = require("./routes/index");
const api = require("./routes/api");
const ws = require("./routes/ws");
const initDotChain = require("./bll/init-polkadot-api");
const sub = require("./bll/sub");
const init = require("./bll/init");

const app = express();
expressWs(app);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(compression()); //gzip
app.use(cors());

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
logger.token("time", function (req, res) {
  return moment().format("YYYY-MM-DD HH:mm:ss");
});
logger.token("realip", function (req, res) {
  if (!req || !req.ip) return "";
  return req.ip.replace("::ffff:", "");
});
logger.token("host", function (req, res) {
  return req.headers.host;
});
app.use(
  logger(":time :method :status :host :realip :url", {
    skip: function (req, res) {
      return res.statusCode == 200 || res.statusCode == 304;
    },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: "10000kb" }));
app.use(cookieParser());
app.use(sessionHelper());
// http跳转到https
// app.all('*',function (req, res, next) {
//     if (req.headers.host!='localhost'&&req.protocol=='http') {
//         console.log('跳转：',req.url);
//         res.redirect('https://'+req.headers.host+req.url);
//     }
//     else {
//         next();
//     }
// });
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "ui/build")));

app.use("/", routes);
app.use("/api", api);
app.ws("/ws", ws);
//管理员登录
// app.post('/login/', bll_admin.login);
//管理员退出
// app.get("/logout/", bll_admin.logout);

// app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use(function (err, req, res, next) {
  if (err == 404) {
    err = new Error("404 not found");
    err.status = 404;
  } else if (typeof err != "object") {
    err = new Error(err);
  }
  if (err && !err.status) err.status = 500;
  if (err.status == 302) {
    return res.redirect(err.message);
  }
  res.status(err.status);
  //err.stack = '';
  res.render("error", {
    message: err.message || "unknow error",
    error: err,
  });
});
global.wsClientList = [];
initDotChain();
sub();
init();

app.listen(port);
console.log("listening on ", port);

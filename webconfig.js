/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-11 15:11:36
 * @LastEditors: fage
 * @LastEditTime: 2022-07-11 17:30:32
 */
"use strict";
const path = require("path");
const mysql = require("./mysql-config");
module.exports = {
  sitename: "集成管理后台",
  wsnode:{
    nodeURL: "ws://106.15.44.155:9948/",
    keyringOption: { type: "sr25519", ss58Format: 42 },
  },
  host: "localhost",
  port: {
    http: 454,
  },
  publicApi: {
    //对外API的秘钥
    secret: "MA14BAHJ2JEASL",
  },
  serverIP: "140.143.93.47",
  mysql: mysql(),
  cookie: {
    enable: false,
    secret: "3**&2fMNU",
    expires_day: 2,
  },
};

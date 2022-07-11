/*
 * @Description: 
 * @Autor: fage
 * @Date: 2022-07-11 15:11:36
 * @LastEditors: fage
 * @LastEditTime: 2022-07-11 17:00:48
 */
"use strict";
var os = require("os");
module.exports = function () {
  var platform = os.platform();
  if (platform == "linux") {
    return {
      connectionLimit: 10,
      host: "127.0.0.1", //内网IP
      user: "root",
      password: "Qq85582507@2022!",
      port: 3306,
      database: "manage",
    };
  } else {
    return {
      connectionLimit: 10,
      host: "106.53.102.130", //外网IP
      user: "root",
      password: "Qq85582507@2022!",
      port: 3306,
      database: "manage",
    };
  }
};

/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-11 15:11:36
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-04 15:01:10
 */
"use strict";
var os = require("os");
module.exports = function () {
  var platform = os.platform();
  if (platform == "linux") {
    return {
      connectionLimit: 10,
      host: "192.168.14.10",
      user: "substats",
      password: "6ptSkEtwKirJ6Rei",
      port: 3306,
      database: "substats",
    };
  } else {
    return {
      connectionLimit: 10,
      host: "127.0.0.1",
      user: "substats",
      password: "m7c3JrFhnPbizn6P",
      port: 3306,
      database: "substats",
    };
  }
};

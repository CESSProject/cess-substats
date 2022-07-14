/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-11 15:11:36
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-12 11:03:19
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
      host: "192.168.14.10",
      user: "substats",
      password: "6ptSkEtwKirJ6Rei",
      port: 3306,
      database: "substats",
    };
  }
};

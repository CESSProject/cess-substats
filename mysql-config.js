/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-11 15:11:36
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-09-06 17:18:21
 */
"use strict";
const fs = require("fs");
module.exports = function (configFilePath) {
  if (fs.existsSync(configFilePath)) {
    try {
      let tmp = fs.readFileSync(configFilePath, { encoding: "utf-8" });
      return JSON.parse(tmp);
    } catch (e) {
      console.error(e);
    }
  } else {
    console.log("config file not found:", configFilePath);
  }
  return null;
};

// the mysql config format as:
// {
//   "connectionLimit": 10,
//   "host": "127.0.0.1",
//   "user": "substats",
//   "password": "Ni6eY85EXM6ZrMLG",
//   "port": 3306,
//   "database": "substats"
// }

/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-11 15:11:36
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-12 17:25:17
 */
"use strict";

/*
 * API公共接口
 */

const express = require("express");
const publicAPI = require("../controls/public/index");

var router = express.Router();

router.post("/:way/:action", publicAPI);

module.exports = router;

"use strict";
const Dal = require("../dal/dal_common");
const listPage = require("./action_helper/list_page");
const detail = require("./action_helper/detail");
const column = require("./action_helper/column");
const del = require("./action_helper/del");
const create = require("./action_helper/create");
const update = require("./action_helper/update");
const exportHelper = require("./action_helper/export");
const batchUpdate = require("./action_helper/batch_update");
const copy = require("./action_helper/copy");

module.exports = function (req, res, next) {
    let funs = {
        list: list,
        create: create,
        update: update,
        del: del,
        column: column,
        detail: detail,
        batch_update: batchUpdate,
        copy: copy,
        export:exportHelper,
        get_table_names:getTableNames,
        get_colum_names:getColumNames
    };
    let ret = {
        msg: 'ok',
        data: []
    };
    let way=req.body.way;
    let dal = new Dal('tb_'+way);
    let f = funs[req.body.action];
    if (f) {
        f(ret, dal, req, res);
    }
    else {
        ret.msg = 'action(' + req.body.action + ')未定义';
        res.json(ret);
    }
}

function list(ret, dal, req, res) {
    let fieldStr = ' * ';
    let fromStr = dal.tableName + ' as a';
    listPage(fieldStr, fromStr, dal, req, res);
}
async function getTableNames(ret, dal, req, res) {
    ret.data=await dal.getTableNames();
    res.json(ret);
}
async function getColumNames(ret, dal, req, res) {
    ret.data=await dal.findColumnName(req.body.column_name);
    res.json(ret);
}

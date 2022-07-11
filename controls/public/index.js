/*
 * @Description: 
 * @Autor: fage
 * @Date: 2022-07-11 15:11:36
 * @LastEditors: fage
 * @LastEditTime: 2022-07-11 17:23:26
 */
/*
 * @Description: 
 * @Autor: fage
 * @Date: 2022-07-11 15:11:36
 * @LastEditors: fage
 * @LastEditTime: 2022-07-11 17:22:49
 */
"use strict";
let paramHelper = require('../param-helper');
let crypto = require("../../util/crypto");
/*
 * 公开接口（无须登录即可调用）
 */
let secret = global.webconfig.publicApi.secret;

let obj = {
};

module.exports = async function (req, res, next) {
    try {
        let way = req.body.way||req.params.way;
        let action=req.body.action||req.params.action;
        paramHelper(req);
        let o = obj[way];
        if(!o){
            res.json({
                result: 'way未定义:' + way,
                msg: 'fail'
            });
            return false;
        }
        let temp = o.actions.indexOf(action);
        if (temp==-1) {
            res.json({
                result: 'action是不被允许:' + action,
                msg: 'noAuthority'
            });
            return false;
        }
        if(o.needsecret){
            if (!req.body.secret || req.body.secret != secret) {
                res.json({
                    result: 'secret error.',
                    msg: 'fail'
                });
                return false;
            }
        }
        if(o.md5){
            if (!req.body.secret ) {
                res.json({
                    result: 'secret not found.',
                    msg: 'fail'
                });
                return false;
            }
            let str=way+action;
            if(req.body.id){
                str+=req.body.id;
            }
            str+=secret;
            let md5str=crypto.md5(str).toLocaleLowerCase();
            if(req.body.secret!=md5str){
                res.json({
                    result: 'secret error.',
                    msg: 'error',
                    yoursecret:req.body.secret
                });
                return false;
            }
        }
        o.func(req, res, next);
    } catch (e) {
        next(e);
    }
}

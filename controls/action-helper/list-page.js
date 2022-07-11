"use strict";
const moment = require("moment");
const sqlSafe = require("../../util/sql-safe");

module.exports = list;

async function list(fieldStr, fromStr, dal, req, res) {
    let ret = {
        msg: 'ok',
        data: [],
        dangerous: []
    };
    try {
        const admins = global.webconfig.admins;
        const pre = req.body.pre || 'a.';

        let whereStr = '', whereStrArr = req.whereStrArr || [];
        let sortStr = '';
        if ('keyvalues' in req.body)
            req.body.keyvalues = req.body.keyvalues.toString();

        let orderway = req.body.orderway && req.body.orderway == 1 ? 'asc' : 'desc';
        let orderby = req.body.orderby || 'id';
        let keynames = req.body.keynames || '';
        let keyvalues = req.body.keyvalues || '';
        let signs = req.body.signs || '';

        if (!sqlSafe.checkSafe(orderby)) {
            ret.dangerous.push(orderby);
            orderby = 'id';
        }

        let starttime = req.body.starttime || '';
        let timeColumn = req.body.timecolumn || pre + 'add_time';

        if (starttime) {
            starttime = moment(starttime, 'YYYY-MM-DD HH:mm:ss');
            whereStrArr.push(timeColumn + '>="' + starttime.format() + '"');
        }
        let endtime = req.body.endtime || '';
        if (endtime) {
            endtime = moment(endtime, 'YYYY-MM-DD HH:mm:ss').format();
            whereStrArr.push(timeColumn + '<="' + endtime + '"');
        }

        var signDic = '= != like notlike > >= < <=';//词典
        if (keynames != '' && keyvalues != '' && signs != '') {
            let keyArr = keynames.split(',');
            let valArr = keyvalues.split(',');
            let signArr = signs.split(',');
            for (let i = 0; i < keyArr.length; i++) {
                let key = keyArr[i];
                let val = valArr[i];
                let sign = signArr[i];
                if (!key
                    || val == ''
                    || !sign
                    || signDic.indexOf(sign) == -1
                    || !sqlSafe.checkSafe(key)) {
                    ret.dangerous.push(key);
                    continue
                }
                if (key == 'id') {
                    val = parseInt(val);
                    whereStrArr.push(pre + 'id=' + val);
                    continue;
                }
                switch (sign) {
                    case 'like':
                        whereStrArr.push(key + ' like "%' + val + '%"');
                        break;
                    case 'notlike':
                        whereStrArr.push(key + ' not like "%' + val + '%"');
                        break;
                    case '>':
                    case '>=':
                    case '<':
                    case '<=':
                        whereStrArr.push(key + sign + val);
                        break;
                    default:
                        whereStrArr.push(key + sign + '"' + val + '"');
                        break;
                }
            }
        }
        if (orderby == 'id') {
            sortStr = ' order by ' + pre + orderby + ' ' + orderway;
        } else {
            sortStr = ' order by ' + orderby + ' ' + orderway + ',' + pre + 'id desc';
        }
        if(req.groupby){
            sortStr=' GROUP BY '+req.groupby+sortStr;
        }

        whereStr = whereStrArr.length > 0 ? whereStrArr.join(' and ') : null;
        ret.pageindex = req.body.pageindex;
        ret.pagesize = req.body.pagesize;
        ret.totle = await dal.findCount(fromStr, whereStr);
        if (!ret.totle || req.body.onlytotle) {
            // console.log(fromStr, whereStr);
            ret.data = [];
        } else {
            // console.log(fieldStr, fromStr, whereStr, sortStr, req.body.pageindex, req.body.pagesize);
            ret.data = await dal.findByPage(fieldStr, fromStr, whereStr, sortStr, req.body.pageindex, req.body.pagesize);
            // console.log(ret.data);
            if (req.body.action != 'analysis') {
                ret.data.forEach(t => {
                    if ('admin_id' in t) {
                        let admin = admins.find(a => a.id == t.admin_id);
                        if (admin) {
                            t.admin_avatar = admin.avatar;
                            t.admin_name = admin.name;
                            t.admin_mobile = admin.mobile;
                        }
                    }
                    if (t.to_admin_id) {
                        let admin = admins.find(a => a.id == t.to_admin_id);
                        if (admin) {
                            t.to_admin_avatar = admin.avatar;
                            t.to_admin_name = admin.name;
                        }
                    }
                });
            }
        }
    } catch (e) {
        ret.msg = 'error';
        console.log(e);
        ret.err = e;
    }
    // ret.body = req.body;
    if ((typeof req.cb).toLocaleLowerCase() == 'function') {
        req.cb(ret);
    }
    res.json(ret);
}

let postParams={
    pageindex:1,
    pagesize:10,
    filter:[
        {
            column:'title',
            sign:'=,!=,<,>,between,betweenTime,like,nolike',
            values:[1,2]
        }
    ],
    filterType:'or',
    sort:[
        {
            column:'id',
            type:'asc'
        },
        {
            column:'sort_id',
            type:'desc'
        }  
    ]
};

"use strict";
const MysqlBase = require('./mysql_base');

module.exports = class DalCommon extends MysqlBase {
    constructor(tableName) {
        super('db_crm', tableName);
    }

    insert(entity, checkQuery) {
        return new Promise(async (resolve, reject) => {
            let ret = {msg: 'fail', id: 0};
            try {
                if (checkQuery) {
                    let result = await super.findOne(checkQuery);
                    if (result && result.length > 0) {
                        ret.msg = '添加重复了.';
                        return resolve(ret);
                    }
                }
                let result = await super.insert(entity);
                entity.id = result.insertId || 0;
                ret.msg = entity.id > 0 ? 'ok' : 'fail';
                ret.id = entity.id;
                resolve(ret);
            } catch (e) {
                if(JSON.stringify(e).indexOf('ER_DUP_ENTRY')!=-1){
                    ret.msg = '添加重复了';
                    return resolve(ret);
                }
                console.log(e);
                ret.err = e;
                reject(ret);
            }

        });
    }

    addCount(id,cell,count=1) {
        let sqlStr = 'update ?? set ?=?+? where id=?';
        return super.query(sqlStr, [this.tableName,cell,cell,count, id]);
    }

    update(entity) {
        let id = entity.id;
        delete entity.id;
        return super.updateById(entity, id);
    }

    getAllTableNames(){
        let sql="select table_name from information_schema.tables where table_schema='crm_woxifang'";
        return super.query(sql);
    }
}













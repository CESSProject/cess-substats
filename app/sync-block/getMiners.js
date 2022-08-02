/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-12 15:39:39
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-02 15:13:22
 * @description: 描述信息
 * @author: chenbinfa
 */
const { ApiPromise, WsProvider, Keyring } = require("@polkadot/api");
const {
  BN,
  BN_ONE,
  BN_THOUSAND,
  BN_TWO,
  bnToBn,
  extractTime,
} = require("@polkadot/util");
let api = null;
let webconfig = require("../../webconfig");
global.webconfig = webconfig;
let util = require("../../util/common");
const Dal = require("../../dal/dal-common");
const dalAccount = new Dal("tb_block_account");
const _ = require("lodash");
const init = require("../init");

async function main() {
  api = await init();
  let list = await api.query.sminer.minerItems.entries();
  list = list.map(([key, entry]) => {
    let id = _.get(
      key.args.map((k) => k.toHuman()),
      `0`
    );
    let humanObj = entry.toJSON();
    return _.assign(humanObj, { key: id });
  });
  //   console.log(list);
  for (o of list) {
    let entity = {
      accountId: o.key,
      amount: 0,
      txCount: 0,
      isMiner: 1,
    };
    const ret = await dalAccount.insert(entity, {
      accountId: entity.accountId,
    });
    console.log(ret);
  }
  console.log("complete!");
  process.exit();
}
main();

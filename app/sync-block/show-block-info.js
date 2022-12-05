/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-12 15:39:39
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-12-05 16:18:22
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
  formatNumber,
  isFunction,
} = require("@polkadot/util");
let api = null;
let webconfig = require("../../webconfig");
global.webconfig = webconfig;
const init = require("../init");
const fs = require("fs");

async function getBlock(value) {
  console.log("value", value);
  let hash = "";
  if (typeof value != "number") {
    hash = value;
  } else {
    let result = await api.rpc.chain.getBlockHash(value);
    hash = result.toHex();
  }
  console.log("******************", hash);
  const blockInfo = await api.rpc.chain.getBlock(hash);
  const blockHeight = blockInfo.block.header.number.toNumber();
  console.log("blockHeight", blockHeight);

  const events = await api.query.system.events.at(hash);
  let entity = blockInfo.toHuman();
  // console.log(JSON.stringify(entity, null, 2));
  console.log("========================================");
  // console.log(JSON.stringify(events, null, 2));
  fs.writeFileSync("./events.json", JSON.stringify(events.toHuman(), null, 2));
  let tmp = events.toHuman();
  for (ev of tmp) {
    if (
      ev.event?.method == "Transfer" &&
      ev.event?.section == "balances" &&
      ev.event?.data?.from &&
      ev.event?.data?.to
    ) {
      console.log();
      let obj = {
        from: ev.event.data.from,
        to: ev.event.data.to,
        amount: ev.event.data.amount.split(",").join(""),
      };
      console.log(obj);
    }
  }
  // fs.writeFileSync("./block.json", JSON.stringify(entity, null, 2));
}
async function main() {
  api = await init();
  await getBlock(472450);
  console.log("complete!");
  process.exit();
}
main();

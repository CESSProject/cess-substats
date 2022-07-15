/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-12 15:39:39
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-15 16:12:59
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

async function initAPI() {
  if (api) return;
  const wsProvider = new WsProvider("ws://106.15.44.155:9948/");
  api = new ApiPromise({ provider: wsProvider });
  await api.isReady;
}
async function getBlock(value) {
  let hash = "";
  if (typeof value != "number") {
    hash = value;
  } else {
    let result = await api.rpc.chain.getBlockHash(value);
    hash = result.toHex();
  }
  const blockInfo = await api.rpc.chain.getBlock(hash);
  const blockHeight = blockInfo.block.header.number.toNumber();
  console.log("blockHeight", blockHeight);

  const events = await api.query.system.events.at(hash);
  let entity = blockInfo.toHuman();
  delete entity.block.extrinsics;
  entity.trnactions = await getTx(blockInfo, events);
  //   console.log(JSON.stringify(entity, null, 2));
  //   console.log(JSON.stringify(entity));
}
async function getTx(src, events) {
  //   let blockInfo = src.toHuman();
  blockInfo = src.block;
  let trnactions = [];
  for (let index in blockInfo.extrinsics) {
    let enx = blockInfo.extrinsics[index];
    try {
      if (typeof enx != "object" || !("toHuman" in enx)) {
        continue;
      }
      let json = enx.toHuman();
      const filtered = events.filter(
        ({ phase }) =>
          phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index)
      );
      json.events = filtered;
      for (let ev of filtered) {
        console.log(ev.toHuman());
      }
      trnactions.push(json);
    } catch (e) {
      console.error(e);
      console.log("error enx", enx);
    }
  }
  return trnactions;
}
async function main() {
  await initAPI();
  await getBlock(5490);
  console.log("complete!");
  process.exit();
}
main();

/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-12 15:39:39
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-14 17:51:47
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
const Dal = require("../../dal/dal-common");
const dalBlock = new Dal("tb_block");
const dalTransaction = new Dal("tb_transaction");
// const dalBlock = new Dal("tb_block");

async function initAPI() {
  if (api) return;
  const wsProvider = new WsProvider("ws://106.15.44.155:9948/");
  api = new ApiPromise({ provider: wsProvider });
  await api.isReady;
}

async function main2() {
  // initialise via static create
  const wsProvider = new WsProvider("ws://106.15.44.155:9948/");
  const api = new ApiPromise({ provider: wsProvider });
  await api.isReady;
  // make a call to retrieve the current network head
  //   api.rpc.chain.subscribeNewHeads((header) => {
  //     console.log(header.toHuman());
  //     console.log(`Chain is at #${header.number}`);
  //   });

  //   const unsub = await api.query.timestamp.now(now => {
  //     console.log(`now of ${now}`);
  //   });

  // let a = api.consts.babe.expectedBlockTime;

  // console.log(a.toHuman());

  // api.rpc.chain.subscribeNewHeads((header) => {
  //   console.log(JSON.stringify(header));
  //   console.log(header.toArray());
  //   // console.log("blockHeight", header.number.toString());
  //   console.log(Object.keys(header));
  //   let json = header.toHuman();
  //   console.log(json.digest.logs);
  // });

  let value = 2351;
  let hash = "";
  if (typeof value != "number") {
    hash = value;
  } else {
    let result = await api.rpc.chain.getBlockHash(value);
    hash = result.toHex();
  }

  let events = await api.query.system.events.at(hash);
  let result2 = await api.rpc.chain.getBlock(hash); //subscribe
  let result3 = await api.derive.chain.getHeader(hash); //subscribe

  // events = events.map((record, index) => ({
  //   // build entity
  //   indexes: [index],
  //   key: `${Date.now()}-${index}-${record.hash.toHex()}`,
  //   record,
  // }));
  events = events.toHuman();
  //   console.log(JSON.stringify(events));
  return;

  let index = 0;
  const filtered = events.filter(
    ({ phase }) => phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index)
  );
  console.log(filtered[0].action);
  console.log(JSON.stringify(filtered));

  // console.log("hash", hash);
  // console.log("result1", JSON.stringify(result1));
  // console.log("result2", JSON.stringify(result2));
  // console.log("stringify", JSON.stringify(result3));
  // console.log("toJSON", result3.toJSON());
  // console.log("toHuman", result3.toHuman());

  // console.log("stringify", JSON.stringify(result2));
  // console.log("toJSON", result2.toJSON());
  // console.log("toHuman", result2.toHuman());

  // result2 = result2.toHuman();
  // console.log(result2);
  // console.log(result2.block.extrinsics);
  // console.log("*******************************************");
  // console.log(JSON.stringify(result2.block.extrinsics));
}
async function getBlock(value) {
  let hash = "";
  if (typeof value != "number") {
    hash = value;
  } else {
    let result = await api.rpc.chain.getBlockHash(value);
    hash = result.toHex();
  }
  let events = await api.query.system.events.at(hash);
  let blockInfo = await api.rpc.chain.getBlock(hash);
  let blockHeight = blockInfo.block.header.number.toNumber();
  //   await saveBlock(hash,blockHeight, blockInfo);
  await saveTx(hash, blockHeight, blockInfo);
  //   blockInfo = blockInfo.toHuman();
  //   blockInfo = blockInfo.block;
  //   console.log(
  //     "blockInfo",
  //     JSON.stringify(blockInfo.extrinsics[0].hash.toHex())
  //   );
  return;
}
async function saveBlock(hash, blockHeight, src) {
  let blockInfo = src.toHuman();
  blockInfo = blockInfo.block;
  let result = await dalBlock.insert({
    hash,
    parentHash: blockInfo.header.parentHash,
    number: blockHeight,
    stateRoot: blockInfo.header.stateRoot,
    extrinsicsRoot: blockInfo.header.extrinsicsRoot,
    digest: JSON.stringify(blockInfo.header.digest),
    extrinsics: JSON.stringify(blockInfo.extrinsics),
    extrinsicsCount: blockInfo.extrinsics.length,
  });
  console.log(result);
}
async function saveTx(blockHash, blockHeight, src, events) {
  //   let blockInfo = src.toHuman();
  blockInfo = src.block;
  for (let enx of blockInfo.extrinsics) {
    let json = enx.toHuman();
    let hash = enx.hash.toHex();
    // console.log(json, hash);
    let entity = {
      blockHeight,
      hash,
      isSigned: json.isSigned ? 1 : 0,
      method: json.method.method,
      section: json.method.section,
      args: JSON.stringify(json.method.args),
    };
    if (json.isSigned) {
      entity.era = json.era.ImmortalEra;
      entity.nonce = enx.nonce.toNumber();
      entity.signature = enx.signature.toHex();
      entity.signer = json.signer.Id;
      entity.tip = enx.tip.toNumber();
    }
    console.log(entity);
    let result = await dalTransaction.insert(entity);
    console.log(result);
  }
}
async function saveEvent(blockHeight, src, txId, txIndex, events) {
  events = events.toHuman();
  console.log(JSON.stringify(events));
  const filtered = events.filter(
    ({ phase }) => phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(txIndex)
  );
  console.log(JSON.stringify(filtered));
}
async function main() {
  await initAPI();
  //   for (let i = 1000; i < 10000; i++) {
  //     await getBlock(i);
  //   }
  await getBlock(8112);
}
main2();

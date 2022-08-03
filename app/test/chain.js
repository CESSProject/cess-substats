/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-12 15:39:39
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-03 11:30:25
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
const _ = require("lodash");

async function main() {
  // initialise via static create
  const wsProvider = new WsProvider("ws://106.15.44.155:9948");
  const api = new ApiPromise({ provider: wsProvider });
  await api.isReady;

  let a = await api.query.timestamp.now();
  console.log(a);

  // a = await api.query.balances.totalIssuance();
  // console.log(a.toHuman());

  a = await api.query.system.account.entries();
  a = a.map(([key, entry]) => {
    let id = _.get(
      key.args.map((k) => k.toHuman()),
      `0`
    );
    let humanObj = entry.toJSON();
    return _.assign(humanObj, { key: id });
  });
  console.log(a);

  // make a call to retrieve the current network head
  // api.rpc.chain.subscribeNewHeads((header) => {
  //   console.log("header.author", header.author);
  //   console.log(header.toHuman());
  //   console.log(`Chain is at #${header.number}`);
  // });

  // let value =
  //   "0x2c79ad0419bfeaf70d4517a366094486717b01520f435a53216f90bc560ae3df";
  // let tmp = await api.derive.chain.getHeader(value);
  // console.log(tmp);
  // console.log("+++++++++++++++++++++++++++++++++++");
  // tmp = tmp.authorFromMapping || tmp.author;
  // console.log("+++++++++++++++++++++++++++++++++++");
  // console.log(tmp.toHuman());

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

  // let value = 2351;
  // let hash = "";
  // if (typeof value != "number") {
  //   hash = value;
  // } else {
  //   let result = await api.rpc.chain.getBlockHash(value);
  //   hash = result.toHex();
  // }

  // let events = await api.query.system.events.at(hash);
  // let result2 = await api.rpc.chain.getBlock(hash); //subscribe
  // let result3 = await api.derive.chain.getHeader(hash); //subscribe

  // events = events.map((record, index) => ({
  //   // build entity
  //   indexes: [index],
  //   key: `${Date.now()}-${index}-${record.hash.toHex()}`,
  //   record,
  // }));
  // events = events.toHuman();
  // console.log(JSON.stringify(events));

  // let index = 0;
  // const filtered = events.filter(
  //   ({ phase }) => phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index)
  // );
  // console.log(JSON.stringify(filtered));

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

main();

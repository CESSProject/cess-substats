/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-12 15:39:39
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-12 15:59:37
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
const _ = require("lodash");
let webconfig = require("../../webconfig");
global.webconfig = webconfig;
const Dal = require("../../dal/dal-common");
const dal = new Dal("tb_miner");
const init = require("../init");

async function getMiner() {
  console.log("start");
  let retsult = await api.query.sminer.minerItems.entries();
  console.log("get miner", retsult.length);
  retsult = retsult.map(([key, entry]) => {
    let id = _.get(
      key.args.map((k) => k.toHuman()),
      `0`
    );
    let human = entry.toHuman();
    let json = entry.toJSON();

    let obj = {
      collateralAccount: id,
      beneficiaryAccount: json.beneficiary,
      collaterals: toNumber(json.collaterals),
      state: human.state,
      power: json.power,
      space: json.space,
      totalReward: toNumber(json.rewardInfo.totalReward),
      totalRewardsCurrentlyAvailable: toNumber(
        json.rewardInfo.totalRewardsCurrentlyAvailable
      ),
      totalNotReceive: toNumber(json.rewardInfo.totalNotReceive),
    };
    return obj;
  });
  let i = 0;
  for (let entity of retsult) {
    i++;
    let tmp = await dal.findWithQuery({
      collateralAccount: entity.collateralAccount,
    });
    if (tmp.length > 0) {
      entity.id = tmp[0].id;
      tmp = await dal.update(entity);
      console.log("update", i, retsult.length);
    } else {
      tmp = await dal.insert(entity);
      console.log("add", i, retsult.length);
    }
    console.log(tmp);
  }
  console.log("complete");
  setTimeout(getMiner, 30000);
}
async function main() {
  api = await init();
  await getMiner();
}
function toNumber(v) {
  if (typeof v == "string" && v.indexOf("0x") == 0) {
    v == parseInt(v, 16);
  }
  return v;
}
main();

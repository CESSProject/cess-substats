/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-12 16:52:25
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-12 17:10:43
 * @description: 描述信息
 * @author: chenbinfa
 */
import { request } from "@utils";

export default function main(ac1, ac2) {
	return request.post("/api/chainStateConsts/consts", { data: { ac1, ac2 } });
}

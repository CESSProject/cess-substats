/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-12 17:56:56
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-12 17:57:29
 * @description: 描述信息
 * @author: chenbinfa
 */
import { request } from "@utils";

export default function main(data) {
	return request.post("/api/storage/query", { data });
}

/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-12 17:56:56
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-21 16:14:07
 * @description: 描述信息
 * @author: chenbinfa
 */
import { request } from "@utils";

export default {
	list,
	dics
};

function list(data) {
	return request.post("/api/dbcommon/list", { data });
}
function dics() {
	const data = {
		action: "list"
	};
	return request.post("/api/dics/list", { data });
}

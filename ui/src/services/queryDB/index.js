/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-12 17:56:56
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-28 13:55:17
 * @description: 描述信息
 * @author: chenbinfa
 */
import { request } from "@utils";

export default {
	list,
	dics,
	detail
};

function list(data) {
	return request.post("/api/dbcommon/list", { data });
}
function detail(data) {
	return request.post("/api/dbcommon/detail", { data });
}
function dics() {
	const data = {
		action: "list"
	};
	return request.post("/api/dics/list", { data });
}

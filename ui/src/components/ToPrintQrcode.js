/*
 * @description: 生成SVG二维码组件
 * @author: Jack Chen @懒人码农
 * @Date: 2022-05-18 18:05:17
 * @LastEditors: Jack Chen
 * @LastEditTime: 2022-06-08 11:37:05
 */

import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { findLastIndex } from "lodash";

const ToPrintQrcode = (props, myRef) => {
	const { value } = props;
	const wrap = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	};
	const txt = {
		marginLeft: "10px",
		fontSize: 12
	};

	return (
		<div ref={myRef} style={wrap}>
			<QRCodeSVG value={value} size={80} />
			<div style={txt}>{value}</div>
		</div>
	);
};

export default forwardRef(ToPrintQrcode);

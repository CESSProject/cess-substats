/*
 * @description: 生成SVG条形码组件
 * @author: Jack Chen @懒人码农
 * @Date: 2022-05-18 13:42:57
 * @LastEditors: Jack Chen
 * @LastEditTime: 2022-05-26 16:07:08
 */

import { forwardRef } from "react";
import Barcode from "react-barcode";

const ToPrintBarcode = (props, myRef) => {
	const { barcode } = props;

	const config = {
		width: 1,
		height: 30,
		// format: "CODE128",
		// displayValue: true,
		// fontOptions: "",
		// font: "monospace",
		// textAlign: "center",
		// textPosition: "bottom",
		// textMargin: 2,
		fontSize: 12
		// background: "#ffffff",
		// lineColor: "#C93939",
		// margin: 10,
		// marginTop: 0,
		// marginBottom: 0,
		// marginLeft: 0
		// marginRight: 0
	};

	return <Barcode value={barcode} ref={myRef} {...config} />;
};

export default forwardRef(ToPrintBarcode);

/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-28 14:15:58
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-28 17:27:07
 * @description: 描述信息
 * @author: chenbinfa
 */
import {
	DatePicker,
	Input,
	InputNumber,
	Menu,
	Modal,
	Button,
	Tooltip,
	Dropdown,
	Descriptions,
	Select,
	Space,
	Table,
	message,
	Tabs,
	Popconfirm,
	Checkbox,
	Card,
	Form
} from "antd";
import { UserOutlined, DownOutlined, DeleteOutlined, SwapRightOutlined, CopyOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import copy from "copy-to-clipboard";

function formatArr(columns) {
	columns.forEach(t => formatOne(t));
}
function formatOne(column) {
	const t = column;
	if (!t) {
		return;
	}
	if (t.dataIndex && !t.key) {
		t.key = t.dataIndex;
	}
	if (!t.showType) {
		return;
	}
	switch (t.showType) {
		case "date":
			t.render = (text, record, index) => moment(text).format("YYYY-MM-DD");
			break;
		case "date2":
			t.render = (text, record, index) => moment(text).format("MM-DD");
			break;
		case "time":
			t.render = (text, record, index) => moment(text).format("HH:mm:ss");
			break;
		case "time2":
			t.render = (text, record, index) => moment(text).format("HH:mm");
			break;
		case "datetime":
			if (!t.tpl) {
				t.tpl = "YYYY-MM-DD HH:mm:ss";
			}
			t.render = (text, record, index) => {
				return moment(text).format(t.tpl);
			};
			break;
		case "datetime2":
			t.render = (text, record, index) => moment(text).format("MM-DD HH:mm");
			break;
		case "copy":
			t.render = (text, record, index) => (
				<Tooltip placement="topLeft" title="click copy">
					<span
						onClick={() => {
							copy(text);
							message.success("Copy successful !");
						}}
						className="enable-copy-txt-box">
						{text}
						&nbsp;
						<CopyOutlined />
					</span>
				</Tooltip>
			);
			break;
		case "link":
			if (!t.tpl) {
				t.tpl = "./";
			}
			t.render = (text, record, index) => {
				let tpl = t.tpl;
				Object.keys(record).forEach(k => {
					tpl = tpl.replace("{" + k + "}", record[k]);
				});
				return <NavLink to={tpl}>{text}</NavLink>;
			};
			break;
	}
}

export default { formatArr, formatOne };

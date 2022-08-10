/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-28 14:15:58
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-10 11:04:04
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
	Form,
	Progress
} from "antd";
import { UserOutlined, DownOutlined, DeleteOutlined, SwapRightOutlined, CopyOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import copy from "copy-to-clipboard";
import AccountIcon from "@/components/AccountIcon";
import {
	formatterCurrency,
	formatterCurrencyMill,
	formatterCurrencyStr,
	formatterCurrencyStr2,
	formatterSize,
	formatterSizeFromMB,
	formatterSizeFromMBToGB
} from "@utils/format";

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
	let tmp = "";
	switch (t.showType) {
		case "tpl":
			t.render = (text, record, index) => {
				let tpl = t.tpl;
				Object.keys(record).forEach(k => {
					tpl = tpl.replace("{" + k + "}", record[k]);
				});
				return tpl;
			};
			break;
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
				if (t.tpl == "fromNow") {
					tmp = moment(text).fromNow();
					if (tmp == "a few seconds ago") {
						tmp = moment().second() - moment(text).second();
						if (tmp < 0) {
							tmp = tmp + 60;
						}
						tmp = tmp + " seconds ago";
					}
					return tmp;
				}
				return moment(text).format(t.tpl);
			};
			break;
		case "datetime2":
			t.render = (text, record, index) => moment(text).format("MM-DD HH:mm");
			break;
		case "copy":
			t.render = (text, record, index) => {
				if (!text) {
					return "";
				}
				let showText = text;
				if (text.length > 30) {
					showText = text.substring(0, 10) + "******" + text.substring(text.length - 8);
				}
				return (
					<Tooltip placement="topLeft" title="click copy">
						<span
							onClick={() => {
								copy(text);
								message.success("Copy successful !");
							}}
							className="enable-copy-txt-box">
							{showText}
							&nbsp;
							<CopyOutlined />
						</span>
					</Tooltip>
				);
			};
			break;
		case "accountIcon":
			t.render = (text, record, index) => {
				if (!text) {
					return text;
				}
				let showText = text;
				if (text.length > 30) {
					showText = text.substring(0, 10) + "******" + text.substring(text.length - 8);
				}
				return (
					<Tooltip placement="topLeft">
						<span className="enable-copy-icon-box">
							<AccountIcon
								hash={text}
								onClick={() => {
									copy(text);
									message.success("Copy successful !");
								}}
								title="click copy"
							/>
							<NavLink to={"/account/" + text} title="link">
								&nbsp;
								{showText}
								&nbsp;
							</NavLink>
							<CopyOutlined
								onClick={() => {
									copy(text);
									message.success("Copy successful !");
								}}
								title="click copy"
							/>
						</span>
					</Tooltip>
				);
			};
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
		case "currency":
			t.render = (text, record, index) => {
				if (!text) {
					return "";
				}
				if (!text.money) {
					console.log(text);
					text = formatterCurrency(text);
				}
				return (
					<>
						<span className="money">{text && text.money}</span>
						<span className="suffix">{text && text.suffix} TCESS</span>
					</>
				);
			};
			break;
		case "currency-m":
			t.render = (text, record, index) => {
				if (!text) {
					return "";
				}
				return (
					<>
						<span className="money">{formatterCurrencyMill(text)}M</span>
					</>
				);
			};
			break;
		case "currency-qianfen":
			t.render = (text, record, index) => {
				if (!text) {
					return "";
				}
				return (
					<>
						<span className="money">{formatterCurrencyStr2(text)}</span>
					</>
				);
			};
			break;
		case "store-size-g":
			t.render = (text, record, index) => {
				if (!text) {
					return "";
				}
				return formatterSizeFromMBToGB(text);
			};
			break;
		case "progress":
			t.render = (text, record, index) => {
				return <Progress style={{ width: 200 }} strokeColor="blue" percent={text} size="small" />;
			};
			break;
	}
}

export { formatArr, formatOne };

/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-07 14:36:09
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-03 16:03:25
 */
import React, { useRef, useState, useEffect } from "react";
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
	Collapse,
	Empty
} from "antd";
import { UserOutlined, DownOutlined, DeleteOutlined, SwapRightOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import subData from "@services/subdata";
import constantsAJAX from "@services/chain-state/constants";
import storageAJAX from "@services/storage";
import queryDB from "@services/queryDB";
import moment from "moment";
import { formatterCurrency, formatterCurrencyStr, formatterSize, formatterSizeFromMB } from "@utils/format";
import copy from "copy-to-clipboard";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { ThTable } from "@/components/ThTable";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const columns = [
	{
		title: "Block Height",
		dataIndex: "blockHeight",
		key: "blockHeight",
		width: "6%",
		showType: "link",
		tpl: "/transfer/{hash}"
	},
	{
		title: "Hash",
		dataIndex: "hash",
		key: "hash",
		width: "20%",
		textWrap: "word-break",
		ellipsis: true,
		showType: "copy"
	},
	{
		title: "Method",
		dataIndex: "method",
		width: "10%",
		render: (text, record, index) => {
			return record.section + "." + text;
		}
	},
	{
		title: "Status",
		dataIndex: "status",
		width: "8%",
		render: (text, record, index) => {
			return text === "success" ? (
				<span className="green">
					<CheckCircleOutlined /> {text}
				</span>
			) : (
				<span className="red">
					<ExclamationCircleOutlined /> {text}
				</span>
			);
		}
	},
	{
		title: "DestAccount",
		dataIndex: "destAccount",
		width: "15%",
		textWrap: "word-break",
		ellipsis: true,
		showType: "copy"
	},
	{
		title: "Amount",
		dataIndex: "amount",
		width: "5%"
	},
	{
		title: "Time",
		dataIndex: "timestamp",
		width: "10%",
		showType: "datetime",
		tpl: "YYYY-MM-DD HH:mm:ss"
	}
];

const Main = ({ ...propsS }) => {
	document.title = "Transfers-CESS Substats";
	let params = useParams();

	const props = {
		border: true,
		size: "middle",
		pagesize: 10,
		loadList: {
			params: {
				tableName: "block_transaction"
			},
			method: queryDB.list
		},
		titleBar: {
			title: "Transactions"
		},
		table: {
			columns
		}
	};

	return (
		<div className="containner-in">
			<div className="list">
				<ThTable props={props} />
			</div>
		</div>
	);
};

function isEqual(prevProps, nextProps) {
	return _.isEqual(prevProps.data, nextProps.data);
}

export default React.memo(Main, isEqual);

/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-07 14:36:09
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-29 17:52:14
 */
import React, { useRef, useState, useEffect } from "react";
import { DatePicker, Input, Menu, Modal, Button, Dropdown, Descriptions, Select, Space, Table, message, Tabs, Popconfirm, Checkbox, Card, Form } from "antd";
import { UserOutlined, DownOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import subData from "@services/subdata";
import constantsAJAX from "@services/chain-state/constants";
import storageAJAX from "@services/storage";
import queryDB from "@services/queryDB";
import { formatterCurrency, formatterCurrencyStr, formatterSize, formatterSizeFromMB } from "@utils/format";
import { ThTable } from "@/components/ThTable";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
let lastBlockTime = 0;
const columns = [
	{
		title: "AccountId",
		dataIndex: "accountId",
		width: "45%",
		showType: "link",
		textWrap: "word-break",
		ellipsis: true,
		tpl: "{accountId}"
	},
	{
		title: "Amount",
		dataIndex: "amount",
		width: "20%",
		showType: "tpl",
		tpl: "{amount} $TCESS"
	},
	{
		title: "Transfers",
		dataIndex: "txCount",
		width: "20%"
	},
	{
		title: "Is Miner",
		dataIndex: "isMiner",
		width: "15%",
		render: (text, record, index) => (text == 1 ? <CheckOutlined /> : <CloseOutlined />)
	}
];

const Home = ({ ...props }) => {
	const navigate = useNavigate();
	const [miners, setMiners] = useState([]);

	const loadMiners = async () => {
		let result = await storageAJAX({ ac1: "fileBank", ac2: "purchasedPackage" });
		console.log("result", result);
		if (result.msg != "ok") {
			return;
		}
		return result;
	};

	const propsTable = {
		border: true,
		size: "middle",
		pagesize: 10,
		loadList: {
			params: {
				tableName: "block_account"
			},
			method: queryDB.list
		},
		titleBar: {
			title: "Accounts"
		},
		table: {
			columns
		}
	};

	return (
		<div className="containner-in">
			<div className="miner-list">
				<ThTable props={propsTable} />
			</div>
		</div>
	);
};

function isEqual(prevProps, nextProps) {
	return _.isEqual(prevProps.data, nextProps.data);
}

export default React.memo(Home, isEqual);
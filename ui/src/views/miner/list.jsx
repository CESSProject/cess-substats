/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-07 14:36:09
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-08 19:27:54
 */
import React, { useRef, useState, useEffect } from "react";
import { DatePicker, Input, Menu, Modal, Button, Dropdown, Descriptions, Select, Space, Table, message, Tabs, Popconfirm, Checkbox, Card, Form } from "antd";
import { UserOutlined, DownOutlined, DeleteOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import subData from "@services/subdata";
import constantsAJAX from "@services/chain-state/constants";
import storageAJAX from "@services/storage";
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
		title: "ID",
		dataIndex: "peerid",
		width: "5%",
		showType: "link",
		tpl: "/miner/{key}"
	},
	{
		title: "Address1",
		dataIndex: "key",
		width: "30%",
		textWrap: "word-break",
		ellipsis: true,
		showType: "accountIcon"
	},
	{
		title: "Address2",
		dataIndex: "beneficiary",
		width: "30%",
		textWrap: "word-break",
		showType: "accountIcon",
		ellipsis: true
	},
	{
		title: "Power",
		dataIndex: "power",
		width: "15%"
	},
	{
		title: "Mining reward",
		dataIndex: "totalReward",
		width: "20%"
	}
];

const Home = ({ ...props }) => {
	document.title = "Miners-CESS Substats";
	const navigate = useNavigate();
	const [miners, setMiners] = useState([]);

	const loadMiners = async () => {
		let result = await storageAJAX({ ac1: "sminer", ac2: "minerItems" });
		console.log("result", result);
		if (result.msg != "ok") {
			return;
		}
		result.data.sort((t1, t2) => t2.power - t1.power);
		result.data.forEach((t, i) => {
			t.peerid = i + 1;
		});
		// result.data.sort((t1, t2) => t1.peerid - t2.peerid);
		result.data.forEach(m => {
			m.power = formatterSizeFromMB(m.power);
			m.totalReward = _.toNumber(m.rewardInfo.totalReward);
		});
		setMiners(result.data);
		return result;
	};

	const propsTable = {
		border: true,
		size: "middle",
		pagesize: 10,
		loadList: {
			method: loadMiners
		},
		titleBar: {
			title: "Miners"
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

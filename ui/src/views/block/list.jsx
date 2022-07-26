/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-07 14:36:09
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-26 17:48:10
 */
import React, { useRef, useState, useEffect } from "react";
import { DatePicker, Input, Menu, Modal, Button, Dropdown, Tooltip, Descriptions, Select, Space, Table, message, Tabs, Popconfirm, Checkbox, Card, Form } from "antd";
import { UserOutlined, DownOutlined, DeleteOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import "./list.less";
import subData from "@services/subdata";
import constantsAJAX from "@services/chain-state/constants";
import storageAJAX from "@services/storage";
import queryDB from "@services/queryDB";
import moment from "moment";
import { formatterCurrency, formatterCurrencyStr, formatterSize, formatterSizeFromMB } from "@utils/format";
import copy from "copy-to-clipboard";
import { NavLink } from "react-router-dom";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const Main = ({ ...props }) => {
	const navigate = useNavigate();
	const [dataSource, setDataSource] = useState([]);
	useEffect(async () => {
		let result = await queryDB.list({
			tableName: "block_info",
			pageindex: 1,
			pagesize: 10
		});
		console.log("result", result);
		if (result.msg != "ok") {
			return;
		}
		result.data.forEach(m => (m.key = m.id));
		setDataSource(result.data);
	}, []);

	const columns = [
		{
			title: "Block Height",
			dataIndex: "blockHeight",
			key: "blockHeight",
			width: "10%",
			render: blockHeight => <NavLink to={"/block/detail/" + blockHeight}>{blockHeight}</NavLink>
		},
		{
			title: "Hash",
			dataIndex: "hash",
			key: "hash",
			width: "35%",
			textWrap: "word-break",
			ellipsis: true,
			render: hash => (
				<Tooltip placement="topLeft" title="click copy">
					<span
						onClick={() => {
							copy(hash);
							message.success("Copy successful !");
						}}>
						{hash}
					</span>
				</Tooltip>
			)
		},
		{
			title: "Prent Hash",
			dataIndex: "parentHash",
			key: "parentHash",
			width: "35%",
			textWrap: "word-break",
			ellipsis: true,
			render: hash => (
				<Tooltip placement="topLeft" title="click copy">
					<span
						onClick={() => {
							copy(hash);
							message.success("Copy successful !");
						}}>
						{hash}
					</span>
				</Tooltip>
			)
		},
		{
			title: "Time",
			dataIndex: "timestamp",
			key: "timestamp",
			width: "20%",
			render: timestamp => moment(timestamp).format("YYYY-MM-DD HH:mm:ss")
		}
	];

	return (
		<div className="containner-in">
			<div className="list">
				<Table dataSource={dataSource} columns={columns} />
			</div>
		</div>
	);
};

function isEqual(prevProps, nextProps) {
	return _.isEqual(prevProps.data, nextProps.data);
}

export default React.memo(Main, isEqual);

/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-07 14:36:09
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-05 16:51:58
 */
import React, { useRef, useState, useEffect } from "react";
import { DatePicker, Input, Menu, Modal, Button, Dropdown, Tooltip, Descriptions, Empty, Select, Space, Table, message, Tabs, Popconfirm, Checkbox, Card, Form } from "antd";
import { UserOutlined, DownOutlined, DeleteOutlined, AppstoreAddOutlined, SwapOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
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
import styled from "styled-components";
import Transactions from "./Transactions";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
let ignore = false;
const blockList = [];
const txList = [];

const columnsBlock = [
	{
		title: "Block",
		dataIndex: "blockHeight",
		width: "15%",
		showType: "link",
		tpl: "/block/{blockHeight}"
	},
	{
		title: "Hash",
		dataIndex: "hash",
		width: "60%",
		textWrap: "word-break",
		ellipsis: true,
		showType: "copy"
	},
	{
		title: "Time",
		dataIndex: "timestamp",
		width: "25%",
		showType: "datetime",
		tpl: "fromNow"
	}
];
const columnsTx = [
	{
		title: "Method",
		dataIndex: "method",
		width: "10%",
		render: (text, record, index) => {
			return <NavLink to={"/transfer/" + record.hash}>{record.section + "." + text}</NavLink>;
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
		title: "Time",
		dataIndex: "timestamp",
		width: "10%",
		showType: "datetime",
		tpl: "fromNow"
	}
];

const Main = ({ className, miners }) => {
	const [props, setProps] = useState();
	const [propsTx, setPropsTx] = useState();

	useEffect(async () => {
		ignore = false;
		const pBlock = {
			size: "middle",
			hidePager: true,
			pagesize: 10,
			table: {
				dataSource: [],
				columns: columnsBlock
			}
		};
		const pTx = {
			size: "middle",
			hidePager: true,
			pagesize: 10,
			table: {
				columns: columnsTx,
				dataSource: []
			}
		};
		let tmp = await queryDB.list({
			tableName: "block_info",
			pagesize: 10,
			pageindex: 1
		});
		if (tmp.msg == "ok") {
			blockList.push(...tmp.data);
			pBlock.table.dataSource = blockList;
			setProps(pBlock);
		}
		tmp = await queryDB.list({
			tableName: "block_transaction",
			pagesize: 10,
			pageindex: 1
		});
		if (tmp.msg == "ok") {
			txList.push(...tmp.data);
			pTx.table.dataSource = txList;
			setPropsTx(pTx);
		}

		let e = {
			id: "home-blockInfo-2",
			name: "blockInfo",
			e: data => {
				console.log("**************", data);
				// setBlockHeight(data);
				// TODO
				if (ignore) {
					return;
				}
				blockList.unshift({
					id: data.blockHeight,
					key: new Date().valueOf(),
					blockHeight: data.blockHeight,
					hash: data.hash,
					timestamp: data.timestamp
				});
				if (blockList.length > pBlock.pagesize) {
					blockList.pop();
				}
				pBlock.table.dataSource = blockList;
				tmp = _.cloneDeep(pBlock);
				tmp.table.columns = columnsBlock;
				setProps(tmp);
				//tx
				if (!data.trnactions || data.trnactions.length == 0) {
					return;
				}
				data.trnactions.forEach(t => {
					t.key = new Date().valueOf();
					t.status = "success";
					txList.unshift(t);
					if (txList.length > pTx.pagesize) {
						txList.pop();
					}
				});
				pTx.table.dataSource = txList;
				tmp = _.cloneDeep(pTx);
				tmp.table.columns = columnsTx;
				setPropsTx(tmp);
			}
		};
		subData.addEvent(e);
		return () => {
			ignore = true;
			subData.removeEvent(e.id);
		};
	}, []);

	return (
		<>
			<Card
				bodyStyle={{ padding: 0, margin: 0 }}
				className="chart-left"
				title={
					<span>
						<AppstoreAddOutlined /> Latest Blocks
					</span>
				}
				extra={
					<NavLink className="btn-more" to="/block/">
						ALL
					</NavLink>
				}>
				{props ? <ThTable props={props} /> : <Empty />}
			</Card>
			<Card
				bodyStyle={{ padding: 0, margin: 0 }}
				className="chart-right"
				title={
					<span>
						<SwapOutlined /> Transactions
					</span>
				}
				extra={
					<NavLink className="btn-more" to="/transfer/">
						ALL
					</NavLink>
				}>
				{propsTx ? <ThTable props={propsTx} /> : <Empty />}
			</Card>
		</>
	);
};

export default React.memo(styled(Main)`
	display: block;
	overflow: hidden;
`);

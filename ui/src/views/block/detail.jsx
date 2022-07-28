/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-26 17:49:48
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-28 18:00:49
 * @description: 描述信息
 * @author: chenbinfa
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
import styled from "styled-components";
import _ from "lodash";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import queryDB from "@services/queryDB";
import formatShowType from "@/utils/formatShowType";
import moment from "moment";
import copy from "copy-to-clipboard";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Panel } = Collapse;
let runCount = 0;
let dics = [];

function Main({ className }) {
	const { q } = useParams();
	console.log("q", q);
	const [blockHeight, setBlockHeight] = useState(q);
	const [blockDetail, setBlockDetail] = useState({});
	const [columns, setColumns] = useState([]);
	const [transactions, setTransactions] = useState([]);
	const [transactionColumns, setTransactionColumns] = useState([]);

	if (!q) {
		return message.error("blockHeight is not found");
	} else {
		if (q != blockHeight) {
			setBlockHeight(q);
		}
	}
	if (document.getElementById("searchInput")) {
		document.getElementById("searchInput").value = blockHeight;
	}
	console.log("blockHeight", blockHeight);
	useEffect(async () => {
		const params = {
			tableName: "block_info",
			id: blockHeight
		};
		let result = await queryDB.detail(params);
		if (result.msg != "ok") {
			return message.info(result.err || result.msg);
		}
		setBlockDetail(result.data);
	}, [blockHeight]);
	useEffect(async () => {
		let params = {
			tableName: "block_event",
			pageindex: 1,
			pagesize: 10000,
			filter: [
				{
					column: "blockHeight",
					sign: "=",
					values: [blockHeight]
				}
			]
		};
		let result = await queryDB.list(params);
		if (result.msg != "ok") {
			return message.info(result.err || result.msg);
		}
		const events = result.data;
		params = {
			tableName: "block_transaction",
			pageindex: 1,
			pagesize: 10000,
			filter: [
				{
					column: "blockHeight",
					sign: "=",
					values: [blockHeight]
				}
			]
		};
		result = await queryDB.list(params);
		if (result.msg != "ok") {
			return message.info(result.err || result.msg);
		}
		result.data.forEach(tx => {
			tx.events = events.filter(ev => ev.txId == tx.id);
		});
		setTransactions(result.data);
	}, [blockHeight]);
	useEffect(async () => {
		const columnsArr = [
			{
				title: "Block Height",
				dataIndex: "blockHeight",
				key: "blockHeight",
				width: "10%",
				showType: "link",
				tpl: "/block/{blockHeight}"
			},
			{
				title: "Hash",
				dataIndex: "hash",
				key: "hash",
				width: "35%",
				textWrap: "word-break",
				ellipsis: true,
				showType: "copy"
			},
			{
				title: "Prent Hash",
				dataIndex: "parentHash",
				key: "parentHash",
				width: "35%",
				textWrap: "word-break",
				ellipsis: true,
				showType: "copy"
			},
			{
				title: "Time",
				dataIndex: "timestamp",
				key: "timestamp",
				width: "20%",
				showType: "datetime"
			}
		];
		formatShowType.formatArr(columnsArr);
		setColumns(columnsArr);
	}, []);
	useEffect(async () => {
		const columnsArr = [
			{
				title: "method",
				dataIndex: "method",
				width: "15%",
				render: (text, record, index) => {
					return record.section + "." + text;
				}
			},
			{
				title: "status",
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
				title: "destAccount",
				dataIndex: "destAccount",
				width: "15%",
				textWrap: "word-break",
				ellipsis: true,
				showType: "copy"
			},
			{
				title: "amount",
				dataIndex: "amount",
				width: "5%"
			},
			{
				title: "signer",
				dataIndex: "signer",
				width: "15%",
				textWrap: "word-break",
				ellipsis: true,
				showType: "copy"
			},
			{
				title: "Signature",
				dataIndex: "signature",
				width: "15%",
				textWrap: "word-break",
				ellipsis: true,
				showType: "copy"
			},
			{
				title: "Time",
				dataIndex: "timestamp",
				width: "10%",
				showType: "datetime"
			},
			{
				title: "Events",
				dataIndex: "events",
				render: (text, record, index) => {
					if (record.events.length == 0) {
						return "";
					}
					return (
						<Collapse accordion>
							{record.events.map((ev, i) => {
								return (
									<Panel header={ev.section + "." + ev.method} key={i}>
										<pre>{JSON.stringify(JSON.parse(ev.data), null, 2)}</pre>
									</Panel>
								);
							})}
						</Collapse>
					);
				}
			}
		];
		formatShowType.formatArr(columnsArr);
		setTransactionColumns(columnsArr);
	}, []);
	return (
		<div className={className}>
			<Card title="Block Overview">
				<div className="table-content">
					<Descriptions bordered column={1}>
						{columns.map((t, index) => {
							return (
								<Descriptions.Item label={t.title} key={t.key}>
									{t.render ? t.render(blockDetail[t.key], blockDetail, index) : blockDetail[t.key]}
								</Descriptions.Item>
							);
						})}
					</Descriptions>
				</div>
			</Card>
			<Card title={"Extrinsics(" + transactions.length + ")"} style={{ marginTop: 10 }}>
				{transactions.length == 0 ? (
					<Empty />
				) : (
					<div className="table-content">
						{transactions.map(trx => {
							return (
								<Card title={"Hash:" + trx.hash}>
									<div className="table-content">
										<Descriptions bordered column={1}>
											{transactionColumns.map((t, index) => {
												return (
													<Descriptions.Item label={t.title} key={t.key}>
														{t.render ? t.render(trx[t.key], trx, index) : trx[t.key]}
													</Descriptions.Item>
												);
											})}
										</Descriptions>
									</div>
								</Card>
							);
						})}
					</div>
				)}
			</Card>
		</div>
	);
}

export default styled(Main)`
	display: block;
	overflow: hidden;
	.table-content {
		background-color: #fff;
		.ant-descriptions-header {
			margin-bottom: 0 !important;
			padding: 10px;
		}
	}
	pre {
		background-color: #000;
		color: #fff;
		padding: 20px;
	}
`;

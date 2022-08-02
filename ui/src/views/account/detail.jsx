/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-26 17:49:48
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-02 17:47:27
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
	Empty,
	Spin
} from "antd";
import { UserOutlined, DownOutlined, DeleteOutlined, SwapRightOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import _ from "lodash";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import queryDB from "@services/queryDB";
import formatShowType from "@/utils/formatShowType";
import moment from "moment";
import copy from "copy-to-clipboard";
import storageAJAX from "@services/storage";
import { formatterCurrency, formatterCurrencyStr, formatterSize, formatterSizeFromMB } from "@utils/format";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Panel } = Collapse;
let runCount = 0;
let dics = [];
let ignore = false;

//test account
//cXffK7BmstE5rXcK8pxKLufkffp9iASMntxUm6ctpR6xS3icV

function Main({ className }) {
	const { q } = useParams();
	const [loading, setLoading] = useState(false);
	const [account, setAccount] = useState(q);
	const [balances, setBalances] = useState(0);
	const [columns, setColumns] = useState([]);
	const [transactionsOut, setTransactionsOut] = useState([]);
	const [transactionsIn, setTransactionsIn] = useState([]);
	const [transactionColumns, setTransactionColumns] = useState([]);

	if (!q) {
		return message.error("accountId is not found");
	} else {
		if (q != account) {
			setAccount(q);
		}
	}
	if (document.getElementById("searchInput")) {
		document.getElementById("searchInput").value = account;
	}
	console.log("account", account);

	//query Balances
	useEffect(async () => {
		ignore = false;
		setLoading(true);
		let result = await storageAJAX({ ac1: "system", ac2: "account", id: account });
		if (result.msg != "ok") {
			setLoading(false);
			return;
		}
		// setBalances(parseInt(result.data.data.free, 16) / 1000000000000)
		setBalances(formatterCurrencyStr(parseInt(result.data.data.free, 16)));
		console.log(result);
		setLoading(false);
		return () => {
			ignore = true;
		};
	}, [account]);

	// query trans
	useEffect(async () => {
		setLoading(true);
		let params = {
			tableName: "block_transaction",
			pageindex: 1,
			pagesize: 10000,
			filter: [
				{
					column: "signer",
					sign: "=",
					values: [account]
				},
				{
					column: "amount",
					sign: ">",
					values: [0]
				}
			],
			filterType: "and"
		};
		let result = await queryDB.list(params);
		if (result.msg != "ok") {
			setLoading(false);
			return message.info(result.err || result.msg);
		}
		setTransactionsOut(result.data);
		params = {
			tableName: "block_transaction",
			pageindex: 1,
			pagesize: 10000,
			filter: [
				{
					column: "signer",
					sign: "=",
					values: [account]
				},
				{
					column: "amount",
					sign: ">",
					values: [0]
				}
			],
			filterType: "and"
		};
		result = await queryDB.list(params);
		if (result.msg != "ok") {
			setLoading(false);
			return message.info(result.err || result.msg);
		}
		setTransactionsOut(result.data);
		setLoading(false);
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
				title: "Method",
				dataIndex: "method",
				width: "15%",
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
				title: "Signer",
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
			<Spin spinning={loading}>
				<Card title="Account Overview">
					<div className="table-content">
						<Descriptions bordered column={1}>
							<Descriptions.Item label="AccountID">{account}</Descriptions.Item>
							<Descriptions.Item label="Balances">{balances}</Descriptions.Item>
						</Descriptions>
					</div>
				</Card>
			</Spin>
			{/* <Spin spinning={loading}>
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
			</Spin> */}
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

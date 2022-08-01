/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-07 14:36:09
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-01 16:25:58
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
import styled from "styled-components";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const Main = ({ ...propsS }) => {
	const columns = [
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

	const props = {
		size: "middle",
		hidePager: true,
		pagesize: 10,
		loadList: {
			params: {
				tableName: "block_transaction"
			},
			method: queryDB.list
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

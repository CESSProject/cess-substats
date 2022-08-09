/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-07 14:36:09
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-09 11:00:00
 */
import React, { useRef, useState, useEffect } from "react";
import { DatePicker, Input, Menu, Modal, Button, Dropdown, Descriptions, Select, Space, Table, message, Tabs, Popconfirm, Checkbox, Card, Form } from "antd";
import { UserOutlined, DownOutlined, DeleteOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useNavigate, NavLink } from "react-router-dom";
import subData from "@services/subdata";
import constantsAJAX from "@services/chain-state/constants";
import storageAJAX from "@services/storage";
import miner from "@services/miner";
import { formatterCurrency, formatterCurrencyStr, formatterSize, formatterSizeFromMB } from "@utils/format";
import { ThTable } from "@/components/ThTable";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
let lastBlockTime = 0;
const minerColumns = miner.getColumns();

const Home = ({ ...props }) => {
	document.title = "Miners-CESS Substats";
	const navigate = useNavigate();
	const [miners, setMiners] = useState([]);

	const propsTable = {
		border: true,
		size: "middle",
		pagesize: 10,
		loadList: {
			method: miner.loadMiners
		},
		titleBar: {
			title: "Miners"
		},
		table: {
			columns: minerColumns
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

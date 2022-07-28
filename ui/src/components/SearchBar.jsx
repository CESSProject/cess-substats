/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-26 14:52:51
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-28 16:36:18
 * @description: 描述信息
 * @author: chenbinfa
 */
import React, { useState, useEffect } from "react";
import { Button, Col, DatePicker, Input, Row, Select, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Search } = Input;

const SearchBar = ({ className }) => {
	const [keyword, setKeyword] = useState();
	const [searchType, setSearchType] = useState("All");
	const navigate = useNavigate();

	useEffect(() => {
		let pathArr = window.location.pathname.split("/");
		if (pathArr.length == 3) {
			let type = pathArr[1];
			let v = pathArr[2];
			if (type == "block") {
				type = "Block";
			} else if (type == "transaction") {
				type = "Transaction";
			} else if (type == "address") {
				type = "Address";
			} else {
				type = "All";
			}
			setSearchType(type);
			setKeyword(v);
		}
	}, []);

	const onSearch = e => {
		if (e.code && e.code == "Enter" && e.target.value) {
			setKeyword(e.target.value);
		}
		let type = searchType;
		if (searchType == "All") {
			type = getSearchType();
		}
		setSearchType(type);
		let url = "/" + type.toLowerCase() + "/" + keyword;
		navigate(url);
	};
	const getSearchType = () => {
		let type = "Transaction";
		if (keyword.indexOf("cX") == 0) {
			type = "Address";
		} else if (!isNaN(keyword)) {
			type = "Block";
		}
		return type;
	};
	const onChangeType = value => {
		setSearchType(value);
	};
	const onChangeKeyword = e => {
		setKeyword(e.target.value);
	};
	return (
		<div className={className}>
			<Input.Group compact>
				<Select size="large" style={{ width: 120 }} value={searchType} onChange={onChangeType} defaultValue="All">
					<Option value="All">All</Option>
					<Option value="Block">Block</Option>
					<Option value="Transaction">Transaction</Option>
					<Option value="Address">Address</Option>
				</Select>
				<Input
					style={{
						width: "calc(100% - 240px)"
					}}
					id="searchInput"
					size="large"
					onPressEnter={onSearch}
					allowClear
					value={keyword}
					onChange={onChangeKeyword}
					placeholder="Search by Block Height/Transaction Hash/Address ID"
				/>
				<Button onClick={onSearch} size="large" style={{ width: 120 }} type="primary" icon={<SearchOutlined />}>
					Search
				</Button>
			</Input.Group>
		</div>
	);
};

export default React.memo(styled(SearchBar)`
	padding: 32px;
	background-color: #fff;
	margin-bottom: 10px;
`);

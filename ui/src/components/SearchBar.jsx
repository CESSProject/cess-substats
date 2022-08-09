/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-26 14:52:51
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-08 16:10:10
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
			} else if (type == "transfer") {
				type = "Transfer";
			} else if (type == "account") {
				type = "Account";
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
		let type = getSearchType();
		setSearchType(type);
		let url = "/" + type.toLowerCase() + "/" + keyword;
		navigate(url);
	};
	const getSearchType = () => {
		let type = "Transfer";
		if (keyword.indexOf("cX") == 0) {
			type = "Account";
		} else if (keyword.length < 15 && !isNaN(keyword)) {
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
			<div className="big-title block">
				<div className="big-title-txt block">Substats Blockchain Explorer</div>
				<div className="big-title-txt-2 block">Find the block that eats the world.</div>
			</div>
			<Search
				placeholder="Search by Block Height/Transaction Hash/Address ID"
				onSearch={onSearch}
				onPressEnter={onSearch}
				allowClear
				value={keyword}
				bordered={false}
				onChange={onChangeKeyword}
				style={{
					borderRadius: "10px",
					border: "1px solid #ddd",
					backgroundColor: "#fff",
					overflow: "hidden"
				}}
				id="searchInput"
				size="large"
			/>
		</div>
	);
};

export default React.memo(styled(SearchBar)`
	margin-bottom: 20px;
	width: 56%;
	.big-title {
		font-family: "Microsoft YaHei", 微软雅黑;
		.big-title-txt {
			font-size: 23px;
			color: #000;
			font-weight: bold;
		}
		.big-title-txt-2 {
			font-size: 17px;
			color: #aaa;
			margin-bottom: 16px;
		}
	}
	.ant-input-group-addon button {
		border: none !important;
		color: rgb(69 148 255) !important;
	}
`);

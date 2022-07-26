/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-26 14:52:51
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-26 16:50:29
 * @description: 描述信息
 * @author: chenbinfa
 */
import React, { useState } from "react";
import { Button, Col, DatePicker, Input, Row, Select, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";

const { Option } = Select;
const { Search } = Input;

const SearchBar = ({ className }) => {
	const onSearch = (value: string) => console.log(value);
	return (
		<div className={className}>
			<Input.Group compact>
				<Select size="large" style={{ width: 120 }} defaultValue="All">
					<Option value="Block">Block</Option>
					<Option value="Transaction">Transaction</Option>
					<Option value="Address">Address</Option>
				</Select>
				<Input
					style={{
						width: "calc(100% - 240px)"
					}}
					size="large"
					allowClear
					placeholder="Search by Block/Transaction/Address"
				/>
				<Button size="large" style={{ width: 120 }} type="primary" icon={<SearchOutlined />}>
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

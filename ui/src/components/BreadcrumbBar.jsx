/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-26 14:52:51
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-08 15:50:30
 * @description: 描述信息
 * @author: chenbinfa
 */
import React, { useState, useEffect } from "react";
import { Breadcrumb, Col, DatePicker, Input, Row, Select, message } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ className }) => {
	const [searchType, setSearchType] = useState("All");
	return (
		<div className={className}>
			<Breadcrumb>
				<Breadcrumb.Item href="">
					<HomeOutlined />
				</Breadcrumb.Item>
				<Breadcrumb.Item href="">
					<UserOutlined />
					<span>Application List</span>
				</Breadcrumb.Item>
				<Breadcrumb.Item>Application</Breadcrumb.Item>
			</Breadcrumb>
		</div>
	);
};

export default React.memo(styled(SearchBar)`
	display: block;
	overflow: hidden;
	.ant-breadcrumb ol {
		margin-left: -31px !important;
	}
`);

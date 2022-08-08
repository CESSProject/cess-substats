/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-19 16:25:33
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-08 15:35:33
 * @description: 描述信息
 * @author: chenbinfa
 */
/**
 * 头部
 * @author fage
 * @Date: 2022-4-8
 */

import styled from "styled-components";
import _ from "lodash";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { NavLink, useNavigate, use, useLocation } from "react-router-dom";
import { Menu } from "antd";
import React, { useRef, useState, useEffect } from "react";
import {
	HomeOutlined,
	UserOutlined,
	DownOutlined,
	DeleteOutlined,
	LoginOutlined,
	ApartmentOutlined,
	AppstoreAddOutlined,
	SwapOutlined,
	DatabaseOutlined,
	WalletOutlined
} from "@ant-design/icons";

const navBtn = [
	{
		path: "/",
		name: "Home",
		icon: <HomeOutlined />
	},
	{
		path: "/block/",
		name: "Blocks",
		icon: <AppstoreAddOutlined />
	},
	{
		path: "/transfer/",
		name: "Transfers",
		icon: <SwapOutlined />
	},
	{
		path: "/miner/",
		name: "Miners",
		icon: <DatabaseOutlined />
	},
	{
		path: "/account/",
		name: "Accounts",
		icon: <WalletOutlined />
	}
];

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type
	};
}

const items = [
	getItem("HOME", "/", <img width={18} src={process.env.PUBLIC_URL + "/img/icon_gzt1.png"} />),
	getItem("CHAIN", "chain", <img width={18} src={process.env.PUBLIC_URL + "/img/icon_yhgl.png"} />, [
		getItem("Blocks", "/block/"),
		getItem("Transfers", "/transfer/"),
		getItem("Miners", "/miner/"),
		getItem("Accounts", "/account/")
	])
];

function Header({ className }) {
	const navigate = useNavigate();
	let location = useLocation();
	const [selKey, setSelKey] = useState("/");
	const onClick = ({ item, key, keyPath, domEvent }) => {
		console.log("click ", item, key, keyPath, domEvent);
		if (key) {
			navigate(key);
		}
	};

	useEffect(() => {
		console.log(location);
		let p = location.pathname;
		if (p.indexOf("/block/") == 0) {
			p = "/block/";
		} else if (p.indexOf("/transfer/") == 0) {
			p = "/transfer/";
		} else if (p.indexOf("/miner/") == 0) {
			p = "/miner/";
		} else if (p.indexOf("/account/") == 0) {
			p = "/account/";
		}
		setSelKey(p);
	}, [location]);

	return (
		<div className={className}>
			<div className="abs-header" style={{ height: document.body.clientHeight }}>
				<div className="header-content">
					<span className="logo-txt">
						<NavLink to="/">
							<img width={116} src={process.env.PUBLIC_URL + "/img/logo.png"} />
						</NavLink>
					</span>
					<Menu
						onClick={onClick}
						style={{
							width: 180,
							backgroundColor: "rgb(238 240 243)"
						}}
						defaultOpenKeys={["chain"]}
						selectedKeys={[selKey]}
						mode="inline"
						items={items}
					/>
				</div>
				<div className="nav-bottom-link">
					<a href="https://cess.cloud/" target="_blank">
						CESS LAB Product
					</a>
					<span></span>
					<a href="http://121.46.19.38:53002/" target="_blank">
						UTOKIA NFT
					</a>
				</div>
			</div>
		</div>
	);
}

export default styled(Header)`
	display: block;
	overflow: hidden;
	position: relative;
	top: 0;
	.abs-header {
		display: block;
		overflow: hidden;
		width: 180px;
		height: 100%;
		line-height: 30px;
		background-color: rgb(238 240 243);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		.ant-menu-sub.ant-menu-inline {
			background-color: rgb(221 230 242) !important ;
		}
		.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
			background-color: rgb(198 216 241) !important ;
		}
		.header-content {
			a {
				color: #333;
				text-decoration: none;
				padding-right: 0px;
				font-size: 17px;
			}
			padding: 0 0px;
			display: block;
			overflow: hidden;
			text-align: left;
			color: #333;
			span a {
				display: block;
				overflow: hidden;
				clear: both;
				padding: 0 10px;
			}
		}
		.logo-txt {
			background-color: #fff;
			display: block;
			padding: 10px 10px 17px;
			a {
				font-size: 24px;
			}
		}
		.nav-bottom-link {
			width: 100%;
			display: block;
			overflow: hidden;
			position: absolute;
			left: 0;
			bottom: 0;
			span {
				width: 80%;
				border-top: 1px solid #bcd7ed;
				display: block;
				overflow: hidden;
				clear: both;
				margin: 0 auto;
			}
			a {
				line-height: 45px;
				font-size: 13px;
				color: #2977f0;
				width: 100%;
				text-align: center;
				display: block;
			}
		}
	}
`;

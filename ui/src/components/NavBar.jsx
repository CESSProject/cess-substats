/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-19 16:25:33
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-04 14:15:26
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
import { NavLink, useNavigate } from "react-router-dom";
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
	getItem("HOME", "/", <HomeOutlined />),
	getItem("CHAIN", "", <AppstoreAddOutlined />, [
		getItem("Blocks", "/block/"),
		getItem("Transfers", "/transfer/"),
		getItem("Miners", "/miner/"),
		getItem("Accounts", "/account/")
	])
];

function Header({ className }) {
	const navigate = useNavigate();
	const winHeight = document.body.clientHeight;
	const getPath = (u, isActive) => {
		if (isActive) return true;
		let p = window.location.pathname;
		if (u == p) {
			return true;
		}
		const pArr = p.split("/");
		const uArr = u.split("/");
		if (pArr[1] == uArr[1]) {
			return true;
		}
		return false;
	};
	const onClick = ({ item, key, keyPath, domEvent }) => {
		console.log("click ", item, key, keyPath, domEvent);
		if (key) {
			navigate(key);
		}
	};
	return (
		<div className={className}>
			<div className="abs-header" style={{ height: winHeight }}>
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
							backgroundColor: "#eaeff7"
						}}
						defaultSelectedKeys={["1"]}
						defaultOpenKeys={["sub1"]}
						mode="inline"
						items={items}
					/>
					{/* <div>HOME</div>
					<div>CHAIN</div>
					<span>
						{navBtn.map(t => (
							<NavLink key={t.name} to={t.path} style={({ isActive }) => ({ backgroundColor: getPath(t.path, isActive) ? "#c7d7f0" : "" })}>
								{t.icon}&nbsp;
								{t.name}
							</NavLink>
						))}
					</span> */}
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
		background-color: #eaeff7;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		.ant-menu-sub.ant-menu-inline {
			background-color: #dae4f5 !important ;
		}
		.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
			background-color: #a4d1e7 !important ;
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
				line-height: 56px;
			}
		}
		.logo-txt {
			background-color: #fff;
			display: block;
			padding: 10px 0;
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
				border-top: 1px solid #0464b1;
				display: block;
				overflow: hidden;
				clear: both;
				margin: 0 auto;
			}
			a {
				line-height: 45px;
				font-size: 13px;
				color: #333;
				width: 100%;
				text-align: center;
				display: block;
			}
		}
	}
`;

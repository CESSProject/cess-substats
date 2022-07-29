/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-19 16:25:33
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-29 16:01:24
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
import { NavLink } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";

const navBtn = [
	{
		path: "/",
		name: "Home"
	},
	{
		path: "/block/",
		name: "Blocks"
	},
	{
		path: "/transfer/",
		name: "Transfers"
	},
	{
		path: "/miner/",
		name: "Miners"
	},
	{
		path: "/account/",
		name: "Account"
	}
];

function Header({ className }) {
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
	return (
		<div className={className}>
			<div className="abs-header" style={{ height: winHeight }}>
				<div className="header-content">
					<span className="logo-txt">
						<NavLink to="/">
							<img src={process.env.PUBLIC_URL + "/logo.svg"} />
						</NavLink>
					</span>
					<span>
						{navBtn.map(t => (
							<NavLink key={t.name} to={t.path} style={({ isActive }) => ({ color: getPath(t.path, isActive) ? "#ffc107" : "" })}>
								{t.name}
							</NavLink>
						))}
					</span>
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
		width: 150px;
		height: 100%;
		line-height: 30px;
		background-color: #3187fa;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		.header-content {
			a {
				color: #fff;
				text-decoration: none;
				padding-right: 0px;
				font-size: 17px;
			}
			padding: 0 0px;
			display: block;
			overflow: hidden;
			text-align: left;
			color: #fff;
			span a {
				display: block;
				overflow: hidden;
				clear: both;
				padding: 0 20px;
				line-height: 56px;
			}
		}
		.logo-txt {
			background-color: #54b3ff;
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
				color: #fff;
				width: 100%;
				text-align: center;
				display: block;
			}
		}
	}
`;

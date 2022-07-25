/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-19 16:25:33
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-25 13:42:52
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

const navBtn = [
	{
		path: "/",
		name: "Home"
	},
	{
		path: "/block/list",
		name: "Blocks"
	},
	{
		path: "/transfer/list",
		name: "Transfers"
	},
	{
		path: "/miners/list",
		name: "Miners"
	},
	{
		path: "/account/query",
		name: "Account"
	}
];

function Header({ className }) {
	/**
	 * 操作项
	 * @param className
	 */

	return (
		<div className={className}>
			<div className="abs-header">
				<div className="header-content">
					<span className="logo-txt">
						<NavLink to="/">CESS</NavLink>
					</span>
					<span>
						{navBtn.map(t => (
							<NavLink key={t.name} to={t.path} style={({ isActive }) => ({ color: isActive ? "#3D7EFF" : "" })}>
								{t.name}
							</NavLink>
						))}
					</span>
				</div>
			</div>
			<div className="hold"></div>
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
		width: 100%;
		height: 65px;
		line-height: 65px;
		background-color: #404c66;
		position: fixed;
		z-index: 999;
		a {
			color: #fff;
			text-decoration: none;
			padding-right: 30px;
			font-size: 17px;
		}
		.header-content {
			padding: 0 40px;
			display: block;
			overflow: hidden;
			margin: 0 auto;
			text-align: left;
			color: #fff;
		}
		.logo-txt a {
			font-size: 24px;
		}
	}
	.hold {
		width: 100%;
		height: 65px;
		display: block;
		overflow: hidden;
		clear: both;
	}
`;

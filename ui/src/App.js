/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-12 11:21:36
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-10 15:46:29
 * @description: 描述信息
 * @author: chenbinfa
 */
/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-12 11:21:36
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-27 11:52:52
 * @description: 描述信息
 * @author: chenbinfa
 */
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.less";
import Home from "./views/home";
import BlockList from "./views/block/list";
import BlockDetail from "./views/block/detail";
import TransferList from "./views/transfer/list";
import TransferDetail from "./views/transfer/detail";
import MinerList from "./views/miner/list";
import MinerDetail from "./views/miner/detail";
import AccountList from "./views/account/list";
import AccountDetail from "./views/account/detail";
import NavBar from "./components/NavBar";
import MobileNavBar from "./components/mobile/NavBar";
import SearchBar from "./components/SearchBar";
import Demo from "./views/thTableDemo";
import { isMobile } from "@utils";
var isM = isMobile();

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				{isM ? <MobileNavBar className="page-header" /> : <NavBar className="page-header" />}
				<div className="containner">
					<div className="bg-color bg-color-1"></div>
					<div className="bg-color bg-color-2"></div>
					<SearchBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/block" element={<BlockList />} />
						<Route path="/block/:q" element={<BlockDetail />} />
						<Route path="/transfer" element={<TransferList />} />
						<Route path="/transfer/:q" element={<TransferDetail />} />
						<Route path="/miner/" element={<MinerList />} />
						<Route path="/miner/:q" element={<MinerDetail />} />
						<Route path="/account/" element={<AccountList />} />
						<Route path="/account/:q" element={<AccountDetail />} />
						<Route path="/demo" element={<Demo />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;

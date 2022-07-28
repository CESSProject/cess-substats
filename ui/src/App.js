/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-12 11:21:36
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-28 17:59:06
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
import { BrowserRouter } from "react-router-dom";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.less";
import Home from "./views/home";
import BlockList from "./views/block/list";
import BlockDetail from "./views/block/detail";
import TransferList from "./views/transfer/list";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<NavBar className="page-header" />
				<div className="containner">
					<SearchBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/block/" element={<BlockList />}>
							<Route path="/block/:q" element={<BlockDetail />} />
						</Route>
						<Route path="/transfer/" element={<TransferList />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;

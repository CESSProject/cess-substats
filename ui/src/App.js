/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-12 11:21:36
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-07-19 16:43:01
 * @description: 描述信息
 * @author: chenbinfa
 */
import { BrowserRouter } from "react-router-dom";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.less";
import Home from "./views/home";
import BlockList from "./views/block/list";
import NavBar from "./components/NavBar";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<NavBar className="page-header" />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/block/list" element={<BlockList />} />
					{/* <Route path="/file-storage-query/" element={<FileStorageQuery />}>
						<Route path="/file-storage-query/:q" element={<FileStorageQueryResult />} />
						<Route path="/file-storage-query/detail/:q" element={<FileStorageQueryDetail />} />
					</Route>

					<Route path="/file-verification" element={<FileVerification />} />
					<Route path="/file-verification/result/:type/:hash" element={<FileVerificationResult />} />

					<Route path="/file-operation-query" element={<FileOperationQuery />} />
					<Route path="/file-operation-query/:q" element={<FileOperationQueryResult />} />
					<Route path="/file-operation-query/detail/:id/:name" element={<FileOperationQueryDetail />} />

					<Route path="/chain-operation-log" element={<ChainOperationLog />} />
					<Route path="/common-table" element={<CommonTable />} /> */}
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

import { BrowserRouter } from "react-router-dom";
import "./App.less";
import Home from "./views/home";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Home />
			</BrowserRouter>
		</div>
	);
}

export default App;

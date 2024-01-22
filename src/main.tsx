import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<RecoilRoot>
				<Router />
			</RecoilRoot>
		</BrowserRouter>
	</React.StrictMode>,
);

import Spinner from "@components/common/spinner/Spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import { useRecoilValue } from "recoil";
import { headerMenuUseState } from "./states/headerMenuUseState";
import Header from "./components/common/header/Header";
import Menu from "./components/common/menu/Menu";
import TodayTradePage from "./pages/TodayTradePage";
import TradeTab from "./components/trade/TradeTab";

const LoginPage = lazy(() => import("@pages/LoginPage"));
const SignUpPage = lazy(() => import("@pages/SignUpPage"));
const ManageLearnerPage = lazy(() => import("@pages/ManageLearnerPage"));
const TradeHomePage = lazy(() => import("@pages/TradePage"));

const Router = () => {
	const queryClient = new QueryClient();
	const { isUseHeader, isUseMenu, isUseTab } =
		useRecoilValue(headerMenuUseState);

	return (
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={<Spinner />}>
				{isUseHeader && <Header />}
				{isUseTab && <TradeTab />}
				<Routes>
					<Route path="/" element={<SplashPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signUp" element={<SignUpPage />} />
					<Route path="/manageLearner" element={<ManageLearnerPage />} />
					<Route path="/trade/home" element={<TradeHomePage />} />
					<Route path="/trade/todayTrade" element={<TodayTradePage />} />
				</Routes>
				{isUseMenu && <Menu />}
			</Suspense>
		</QueryClientProvider>
	);
};

export default Router;

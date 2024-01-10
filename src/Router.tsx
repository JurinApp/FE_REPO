import Spinner from "@components/common/spinner/Spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { headerMenuUseState } from "./states/headerMenuUseState";

const Header = lazy(() => import("@components/common/header/Header"));
const Menu = lazy(() => import("@components/common/menu/Menu"));
const TradeTab = lazy(() => import("@components/trade/TradeTab"));
const SplashPage = lazy(() => import("@pages/SplashPage"));
const LoginPage = lazy(() => import("@pages/LoginPage"));
const SignUpPage = lazy(() => import("@pages/SignUpPage"));
const MyPage = lazy(() => import("@pages/MyPage"));
const CreateChannelPage = lazy(() => import("@pages/CreateChannelPage"));
const ModifyUserinfoPage = lazy(() => import("@pages/ModifyUserinfoPage"));
const ManageLearnerPage = lazy(() => import("@pages/ManageLearnerPage"));
const TradeHomePage = lazy(() => import("@pages/TradePage"));
const TodayTradePage = lazy(() => import("@pages/TodayTradePage"));
const SettingPage = lazy(() => import("@pages/SettingPage"));

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
					<Route path="/mypage" element={<MyPage />} />
					<Route path="/setting" element={<SettingPage />} />
					<Route path="/createChannel" element={<CreateChannelPage />} />
					<Route path="/modifyUserinfo" element={<ModifyUserinfoPage />} />
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

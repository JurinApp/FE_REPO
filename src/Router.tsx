import Spinner from "@components/common/spinner/Spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import EducatorRoute from "@components/common/permissionRoute/EducatorRoute";
import LearnerRoute from "@components/common/permissionRoute/LearnerRoute";
import IsLoginRoute from "@components/common/permissionRoute/IsLoginRoute";
import Menu from "@components/common/menu/Menu";
import Header from "@components/common/header/Header";
import TradeTab from "@components/tradeStock/TradeTab";

const SplashPage = lazy(() => import("@pages/common/SplashPage"));
const LoginPage = lazy(() => import("@pages/common/LoginPage"));
const SignUpPage = lazy(() => import("@pages/common/SignUpPage"));
const SuccessSignUpPage = lazy(() => import("@pages/common/SuccessSignUpPage"));
const MyPage = lazy(() => import("@pages/common/MyPage"));
const CreateChannelPage = lazy(() => import("@pages/common/CreateChannelPage"));
const ModifyUserinfoPage = lazy(
	() => import("@pages/common/ModifyUserinfoPage"),
);
const ManageLearnerPage = lazy(
	() => import("@pages/educator/manageLearner/ManageLearnerPage"),
);
const TradeHomePage = lazy(() => import("@pages/educator/trade/TradePage"));
const RegisterStockPage = lazy(
	() => import("@pages/educator/trade/RegisterStockPage"),
);
const DetailStockPage = lazy(
	() => import("@pages/educator/trade/DetailStockPage"),
);
const EditStockPage = lazy(() => import("@pages/educator/trade/EditStockPage"));
const TodayTradePage = lazy(() => import("@pages/common/TodayTradePage"));
const SettingPage = lazy(() => import("@pages/common/SettingPage"));
const LearnerStockDetailPage = lazy(
	() => import("@pages/student/stock/LearnerStockDetailPage"),
);
const StudentItemPage = lazy(
	() => import("@pages/student/item/StudentItemPage"),
);
const StudentMyItemPage = lazy(
	() => import("@pages/student/item/StudentMyItemPage"),
);
const ItemPage = lazy(() => import("@pages/educator/item/ItemPage"));
const RegisterItemPage = lazy(
	() => import("@pages/educator/item/RegisterItemPage"),
);
const DetailItemPage = lazy(
	() => import("@pages/educator/item/DetailItemPage"),
);
const EditItemPage = lazy(() => import("@pages/educator/item/EditItemPage"));
const PostPage = lazy(() => import("@pages/post/PostPage"));
const RegisterPostPage = lazy(() => import("@pages/post/RegisterPostPage"));
const DetailPostPage = lazy(() => import("@pages/post/DetailPostPage"));
const EditPostPage = lazy(() => import("@pages/post/EditPostPage"));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1 * 60 * 30000,
		},
	},
});

const Router = () => {
	const { isUseHeader, isUseMenu, isUseTab } =
		useRecoilValue(headerMenuUseState);

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={true} />
			{isUseHeader && <Header />}
			{isUseTab && <TradeTab />}
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path="/" element={<SplashPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signUp" element={<SignUpPage />} />
					<Route path="/successSignUp" element={<SuccessSignUpPage />} />
					<Route element={<IsLoginRoute />}>
						<Route path="/mypage" element={<MyPage />} />
						<Route path="/setting" element={<SettingPage />} />
						<Route path="/modifyUserinfo" element={<ModifyUserinfoPage />} />
						<Route path="/:channelId/trade/home" element={<TradeHomePage />} />
						<Route
							path="/:channelId/trade/todayTrade"
							element={<TodayTradePage />}
						/>

						<Route path="/:channelId/post" element={<PostPage />} />
						<Route
							path="/:channelId/post/detail/:postId"
							element={<DetailPostPage />}
						/>
					</Route>
					<Route element={<EducatorRoute />}>
						<Route path="/:channelId/item" element={<ItemPage />} />
						<Route
							path="/:channelId/manageLearner"
							element={<ManageLearnerPage />}
						/>
						<Route path="/createChannel" element={<CreateChannelPage />} />
						<Route
							path="/:channelId/trade/stock/register"
							element={<RegisterStockPage />}
						/>
						<Route
							path="/:channelId/trade/stock/detail/:stockId"
							element={<DetailStockPage />}
						/>
						<Route
							path="/:channelId/trade/stock/edit/:stockId"
							element={<EditStockPage />}
						/>
						<Route
							path="/:channelId/item/register"
							element={<RegisterItemPage />}
						/>
						<Route
							path="/:channelId/item/detail/:itemId"
							element={<DetailItemPage />}
						/>
						<Route
							path="/:channelId/item/edit/:itemId"
							element={<EditItemPage />}
						/>
						<Route
							path="/:channelId/post/register"
							element={<RegisterPostPage />}
						/>
						<Route
							path="/:channelId/post/edit/:postId"
							element={<EditPostPage />}
						/>
					</Route>
					<Route element={<LearnerRoute />}>
						<Route
							path="/:channelId/stock/:stockId"
							element={<LearnerStockDetailPage />}
						/>
						<Route
							path="/:channelId/student/item"
							element={<StudentItemPage />}
						/>
						<Route
							path="/:channelId/student/myItem"
							element={<StudentMyItemPage />}
						/>
					</Route>
				</Routes>
			</Suspense>
			{isUseMenu && <Menu />}
		</QueryClientProvider>
	);
};

export default Router;

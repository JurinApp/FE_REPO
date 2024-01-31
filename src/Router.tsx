import Spinner from "@components/common/spinner/Spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { headerMenuUseState } from "./states/headerMenuUseState";

const Header = lazy(() => import("@components/common/header/Header"));
const Menu = lazy(() => import("@components/common/menu/Menu"));
const TradeTab = lazy(() => import("@components/educator/trade/TradeTab"));
const SplashPage = lazy(() => import("@pages/common/SplashPage"));
const LoginPage = lazy(() => import("@pages/common/LoginPage"));
const SignUpPage = lazy(() => import("@pages/common/SignUpPage"));
const SuccessSignUpPage = lazy(() => import("@pages/common/SuccessSignUpPage"));
const MyPage = lazy(() => import("@/pages/common/MyPage"));
const CreateChannelPage = lazy(
	() => import("@/pages/common/CreateChannelPage"),
);
const ModifyUserinfoPage = lazy(
	() => import("@/pages/common/ModifyUserinfoPage"),
);
const ManageLearnerPage = lazy(
	() => import("@pages/educator/manageLearner/ManageLearnerPage"),
);
const TradeHomePage = lazy(() => import("@pages/educator/trade/TradePage"));
const RegisterTradeStockPage = lazy(
	() => import("@pages/educator/trade/RegisterTradeStockPage"),
);
const DetailTradeStockPage = lazy(
	() => import("@pages/educator/trade/DetailTradeStockPage"),
);
const EditTradeStockPage = lazy(
	() => import("@pages/educator/trade/EditTradeStockPage"),
);
const TodayTradePage = lazy(() => import("@pages/common/TodayTradePage"));
const SettingPage = lazy(() => import("@/pages/common/SettingPage"));
const StockPage = lazy(() => import("@pages/student/stock/StockPage"));
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
const PostPage = lazy(() => import("@pages/educator/post/PostPage"));
const RegisterPostPage = lazy(
	() => import("@pages/educator/post/RegisterPostPage"),
);
const DetailPostPage = lazy(
	() => import("@pages/educator/post/DetailPostPage"),
);
const EditPostPage = lazy(() => import("@pages/educator/post/EditPostPage"));
const ArticleBoardPage = lazy(
	() => import("@pages/student/post/ArticleBoardPage"),
);
const ArticlePage = lazy(() => import("@pages/student/post/ArticlePage"));

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
					<Route path="/successSignUp" element={<SuccessSignUpPage />} />
					<Route path="/mypage" element={<MyPage />} />
					<Route path="/setting" element={<SettingPage />} />
					<Route path="/createChannel" element={<CreateChannelPage />} />
					<Route path="/modifyUserinfo" element={<ModifyUserinfoPage />} />
					<Route path="/manageLearner" element={<ManageLearnerPage />} />
					<Route path="/stock" element={<StockPage />} />
					<Route path="/studentItem" element={<StudentItemPage />} />
					<Route path="/studentItem/myItem" element={<StudentMyItemPage />} />
					<Route path="/trade/home" element={<TradeHomePage />} />
					<Route
						path="/trade/stock/register"
						element={<RegisterTradeStockPage />}
					/>
					<Route
						path="/trade/stock/detail/:stockId"
						element={<DetailTradeStockPage />}
					/>
					<Route
						path="/trade/stock/edit/:stockId"
						element={<EditTradeStockPage />}
					/>
					<Route path="/trade/todayTrade" element={<TodayTradePage />} />
					<Route path="/item" element={<ItemPage />} />
					<Route path="/item/register" element={<RegisterItemPage />} />
					<Route path="/item/detail/:itemId" element={<DetailItemPage />} />
					<Route path="/item/edit/:itemId" element={<EditItemPage />} />
					<Route path="/post" element={<PostPage />} />
					<Route path="/post/register" element={<RegisterPostPage />} />
					<Route path="/post/detail/:postId" element={<DetailPostPage />} />
					<Route path="/post/edit/:postId" element={<EditPostPage />} />
					<Route path="/articleBoard" element={<ArticleBoardPage />} />
					<Route path="/articleBoard/:articleId" element={<ArticlePage />} />
				</Routes>
				{isUseMenu && <Menu />}
			</Suspense>
		</QueryClientProvider>
	);
};

export default Router;

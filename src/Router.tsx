import Spinner from "@components/common/spinner/Spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import { useRecoilValue } from "recoil";
import { headerMenuUseState } from "./states/headerMenuUseState";
import Header from "./components/common/header/Header";
import Menu from "./components/common/menu/Menu";

const LoginPage = lazy(() => import("@pages/LoginPage"));
const SignUpPage = lazy(() => import("@pages/SignUpPage"));
const ManageLearnerPage = lazy(() => import("@pages/ManageLearnerPage"));

const Router = () => {
	const queryClient = new QueryClient();
	const { isUseHeader, isUseMenu } = useRecoilValue(headerMenuUseState);

	return (
		<QueryClientProvider client={queryClient}>
			{isUseHeader && <Header />}
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path="/" element={<SplashPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signUp" element={<SignUpPage />} />
					<Route path="/manageLearner" element={<ManageLearnerPage />} />
				</Routes>
			</Suspense>
			{isUseMenu && <Menu />}
		</QueryClientProvider>
	);
};

export default Router;

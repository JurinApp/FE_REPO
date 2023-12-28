import Spinner from "@components/common/spinner/Spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import { useRecoilValue } from "recoil";
import { headerState } from "./states/headerState";
import Header from "./components/common/header/Header";

const LoginPage = lazy(() => import("@pages/LoginPage"));
const SignUpPage = lazy(() => import("@pages/SignUpPage"));

const Router = () => {
	const queryClient = new QueryClient();
	const isUseHeader = useRecoilValue(headerState);

	return (
		<QueryClientProvider client={queryClient}>
			{isUseHeader && <Header />}
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path="/" element={<SplashPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signUp" element={<SignUpPage />} />
				</Routes>
			</Suspense>
		</QueryClientProvider>
	);
};

export default Router;

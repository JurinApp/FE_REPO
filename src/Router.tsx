import Spinner from "@components/common/spinner/Spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("@pages/LoginPage"));
const SignUpPage = lazy(() => import("@pages/SignUpPage"));

const Router = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signUp" element={<SignUpPage />} />
				</Routes>
			</Suspense>
		</QueryClientProvider>
	);
};

export default Router;

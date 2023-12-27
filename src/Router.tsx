import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "@components/common/spinner/Spinner";

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

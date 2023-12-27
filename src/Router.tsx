import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Spinner from "@components/common/spinner/Spinner";
import { openConfirmModalState } from "@/states/openConfirmModal";
import { useRecoilValue } from "recoil";
import {
	cancelLockBodyScroll,
	lockBodyScroll,
} from "@/utils/controlBodyScroll";

const LoginPage = lazy(() => import("@pages/LoginPage"));
const SignUpPage = lazy(() => import("@pages/SignUpPage"));

const Router = () => {
	const queryClient = new QueryClient();
	const isOpenConfirmModal = useRecoilValue(openConfirmModalState);

	useEffect(() => {
		isOpenConfirmModal ? lockBodyScroll() : cancelLockBodyScroll();
	}, [isOpenConfirmModal]);

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

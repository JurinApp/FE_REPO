import { userRoleState } from "@/states/userRoleState";
import { getCookie, removeCookie } from "@/utils/cookies";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const useAxios = () => {
	const setUserRole = useSetRecoilState(userRoleState);
	const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const location = useLocation();

	const defaultAxios: AxiosInstance = axios.create({
		baseURL: import.meta.env.VITE_DEV_SERVER_PATH,
	});

	const useTokenAxios: AxiosInstance = axios.create({
		baseURL: import.meta.env.VITE_DEV_SERVER_PATH,
		headers: {
			Authorization: `Bearer ${getCookie("accessToken")}`,
		},
	});

	useTokenAxios.interceptors.response.use(
		(response) => {
			return response;
		},

		async (error) => {
			const status = error.response.status;
			const errorCode = error.response.data.code;

			if (status === 401) {
				setUserRole("anonymous");
				removeCookie();
				alert("재로그인을 해주세요.");
				navigate("/login");
			}

			if (status === 403 && errorCode === "permission_denied") {
				alert("권한이 없습니다.");
				navigate(-1);
			}

			if (
				status === 404 &&
				((location.pathname !== "/modifyUserinfo" &&
					location.pathname !== "/mypage" &&
					errorCode === "not_channel") ||
					errorCode === "not_user_channel")
			) {
				alert("참여중인 채널이 아닙니다.");
				navigate("/mypage");
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
			}

			return Promise.reject(error);
		},
	);

	const axiosData = async (type: string, configParams: AxiosRequestConfig) => {
		try {
			setIsFetchLoading(true);
			if (type === "default") {
				const response = await defaultAxios.request(configParams);
				return response;
			}
			if (type === "useToken") {
				const response = await useTokenAxios.request(configParams);
				return response;
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError: AxiosError = error;
				return axiosError.response;
			}
		} finally {
			setIsFetchLoading(false);
		}
	};

	return { isFetchLoading, axiosData };
};

export default useAxios;

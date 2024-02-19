import { getCookie } from "@/utils/cookies";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAxios = () => {
	const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
	const navigate = useNavigate();

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

			if (status === 401) {
				alert("재로그인을 해주세요.");
				navigate("/login");
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
			}

			return error.response;
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

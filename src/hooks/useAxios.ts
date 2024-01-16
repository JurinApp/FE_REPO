import { getCookie } from "@/utils/cookies";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useState } from "react";

const useAxios = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const defaultAxios: AxiosInstance = axios.create({
		baseURL: import.meta.env.VITE_SERVER_URI,
	});

	const useTokenAxios: AxiosInstance = axios.create({
		baseURL: import.meta.env.VITE_SERVER_URI,
		headers: {
			Authorization: `Bearer ${getCookie("accessToken")}`,
		},
	});

	const axiosData = async (type: string, configParams: AxiosRequestConfig) => {
		try {
			setIsLoading(true);
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
			setIsLoading(false);
		}
	};

	return { isLoading, axiosData };
};

export default useAxios;

import useAxios from "@/hooks/useAxios";
import { userRoleState } from "@/states/userRoleState";
import { useQueries } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

const useUserInfo = () => {
	const userRole = useRecoilValue(userRoleState);
	const { axiosData } = useAxios();

	const getUserInfo = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/${userRole}s/api/v1/users/profile`,
		});
		if (response) {
			if (userRole === "student") {
				return { user: response.data.data, channel: "" };
			}
			if (userRole === "teacher") {
				return response.data.data;
			}
		}
	};

	const getChannelInfo = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/${userRole}s/api/v1/channels`,
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				return response.data.data;
			}
			if (status === 404) {
				return null;
			}
		}
	};

	return useQueries({
		queries: [
			{
				queryKey: ["userInfo"],
				queryFn: getUserInfo,
			},
			{
				queryKey: ["channelInfo"],
				queryFn: getChannelInfo,
			},
		],
	});
};

export default useUserInfo;

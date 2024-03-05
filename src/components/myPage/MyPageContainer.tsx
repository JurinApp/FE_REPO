import useAxios from "@/hooks/useAxios";
import { EnterChannelModal } from "./channel/EnterChannelModal";
import MoveModifyBtn from "./userAndChannelInfo/MoveModifyBtn";
import UserAndChannelInfoSection from "./userAndChannelInfo/UserAndChannelInfoSection";
import { useRecoilValue } from "recoil";
import { userRoleState } from "@/states/userRoleState";
import Spinner from "../common/spinner/Spinner";
import { useQueries } from "@tanstack/react-query";

export interface IUserinfo {
	readonly user: {
		id: number;
		nickname: string;
		schoolName: string;
		userRole: string;
	};
	readonly channel?: {
		name: string;
	};
}

const MyPageContainer = () => {
	const { axiosData } = useAxios();
	const role = useRecoilValue(userRoleState);

	const fetchUserinfo = async () => {
		const apiUrl = `/${role}s/api/v1/users/profile`;
		const response = await axiosData("useToken", {
			method: "GET",
			url: apiUrl,
		});
		if (response) {
			if (role === "student") {
				return { user: response.data.data, channel: "" };
			}
			if (role === "teacher") {
				return response.data.data;
			}
		}
	};
	const fetchChannel = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/${role}s/api/v1/channels`,
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
	const results = useQueries({
		queries: [
			{
				queryKey: ["userinfo"],
				queryFn: fetchUserinfo,
			},
			{
				queryKey: ["channelInfo"],
				queryFn: fetchChannel,
			},
		],
	});
	const isLoading = results.some((query) => query.isLoading);

	return (
		<div className="mx-auto flex h-[calc(100vh-2.938rem)] flex-col justify-end gap-4 bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<MoveModifyBtn />
			{isLoading ? (
				<Spinner />
			) : (
				<UserAndChannelInfoSection
					userInfo={results[0].data}
					channel={results[1].data}
				/>
			)}
			<EnterChannelModal />
		</div>
	);
};

export default MyPageContainer;
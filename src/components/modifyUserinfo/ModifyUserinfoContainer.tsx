ß;
import ModifyUserinfoSection from "./ModifyUserinfoSection";
import { useQueryClient } from "@tanstack/react-query";

export const ModifyUserinfoContainer = () => {
	const queryClient = useQueryClient();

	const userData = queryClient.getQueryData(["userinfo"]);
	const channelInfo = queryClient.getQueryData(["channelInfo"]);
	console.log("채널정보", channelInfo);
	console.log(userData);
	// console.log(result.data, result.isLoading);
	return (
		<div className="mx-auto h-[calc(100vh-2.938rem)] bg-[#ffffff] sm:w-[23.563rem] ">
			<ModifyUserinfoSection userinfo={userData} channel={channelInfo} />
		</div>
	);
};

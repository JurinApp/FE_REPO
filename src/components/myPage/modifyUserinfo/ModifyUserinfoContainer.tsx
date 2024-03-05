import { IChannel } from "@/interface/userinfo";
import { IUserinfo } from "../userinfo/UserinfoContainer";
import ModifyUserinfoSection from "./ModifyUserinfoSection";
import { useQueryClient } from "@tanstack/react-query";

export const ModifyUserinfoContainer = () => {
	const queryClient = useQueryClient();

	const userData: IUserinfo | undefined = queryClient.getQueryData([
		"userinfo",
	]);
	const channelInfo: IChannel | undefined = queryClient.getQueryData([
		"channelInfo",
	]);

	return (
		<div className="mx-auto h-[calc(100vh-2.938rem)] bg-white sm:w-[23.563rem] ">
			<ModifyUserinfoSection userinfo={userData} channel={channelInfo} />
		</div>
	);
};

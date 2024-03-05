import { IChannel } from "@/interface/userinfo";
import { IUserinfo } from "../MyPageContainer";
import ModifyUserInfo from "./ModifyUserInfo";
import { useQueryClient } from "@tanstack/react-query";

const ModifyInfoContainer = () => {
	const queryClient = useQueryClient();

	const userData: IUserinfo | undefined = queryClient.getQueryData([
		"userinfo",
	]);
	const channelInfo: IChannel | undefined = queryClient.getQueryData([
		"channelInfo",
	]);

	return (
		<div className="mx-auto h-[calc(100vh-2.938rem)] bg-white sm:w-[23.563rem] ">
			<ModifyUserInfo userinfo={userData} channel={channelInfo} />
		</div>
	);
};

export default ModifyInfoContainer;

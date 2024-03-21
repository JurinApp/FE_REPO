import { enterChannelModalState } from "@/states/modalState/confirmModalState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { userRoleState } from "@/states/userRoleState";
import { useMemo } from "react";
import ChannelInfo from "./ChannelInfo";
import UserInfo from "./UserInfo";
import { IChannel, IUser } from "@/interface/userAndChannelInfo";

interface UserAndChannelInfoSectionProps {
	readonly userInfo: IUser;
	readonly channel?: IChannel;
}

const UserAndChannelInfoSection = ({
	userInfo,
	channel,
}: UserAndChannelInfoSectionProps) => {
	const userRole = useRecoilValue(userRoleState);
	const setIsEnterChannelModalOpen = useSetRecoilState(enterChannelModalState);
	const navigate = useNavigate();

	const buttonText: string = useMemo(() => {
		let text = "";

		if (userRole === "teacher") {
			text = !channel ? (text = "채널 생성") : (text = "채널 입장");
		}

		if (userRole === "student") {
			text = !channel ? "채널 참여" : (text = "채널 입장");
		}

		return text;
	}, [channel, userRole]);

	const handleClickChannelBtn = () => {
		if (userRole === "teacher") {
			!channel
				? navigate("/createChannel")
				: navigate(`/${channel?.id}/manageLearner`);
		}

		if (userRole === "student") {
			!channel
				? setIsEnterChannelModalOpen(true)
				: navigate(`/${channel?.id}/trade/home`);
		}
	};

	return (
		<div>
			<UserInfo userInfo={userInfo} />
			<ChannelInfo channel={channel} />
			<button
				type="button"
				className="mx-auto mb-8 flex h-[3.188rem] w-full items-center justify-center rounded bg-tekhelet sm:w-[22.563rem]"
				onClick={handleClickChannelBtn}
			>
				<p className="font-medium text-white">{buttonText}</p>
			</button>
		</div>
	);
};

export default UserAndChannelInfoSection;

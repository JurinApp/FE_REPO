import { enterChannelModalState } from "@/states/modalState/confirmModalState";
import { useSetRecoilState } from "recoil";
import MoveCreateChannelBtn from "./MoveCreateChannelBtn";
import { useNavigate } from "react-router";

export interface IUserinfoProps {
	readonly userinfo: {
		user: {
			id: number;
			nickname: string;
			schoolName: string;
			userRole: string;
		};
		channel?: {
			name: string;
		};
	};
	readonly channel?: {
		id: number;
		channelName: string;
		entryCode: string;
	};
}
const UserinfoSection = ({ userinfo, channel }: IUserinfoProps) => {
	const setIsEnterChannelModalOpen = useSetRecoilState(enterChannelModalState);
	const navigate = useNavigate();
	const handleModalOpen = () => {
		setIsEnterChannelModalOpen(true);
	};
	const movePage = () => {
		if (userinfo.user.userRole === "teacher") {
			navigate(`/${channel?.id}/manageLearner`);
		}
		if (userinfo.user.userRole === "student") {
			navigate(`/${channel?.id}/trade/home`);
		}
	};
	return (
		<>
			<div
				className="ml-4 flex h-[8.5rem] w-[361px] flex-col justify-center rounded border border-black border-opacity-10 bg-white "
				id="userinfoSection"
			>
				<div className="my-2 ml-4 flex items-center gap-4">
					<label className="text-black text-opacity-80" htmlFor="name">
						이름
					</label>
					<p className="font-medium">{userinfo.user.nickname}</p>
				</div>
				<div className="my-2 ml-4 flex gap-4">
					<label className="text-black text-opacity-80" htmlFor="school">
						학교
					</label>
					<p className="font-medium">{userinfo.user.schoolName}</p>
				</div>
				<div className="my-2 ml-4 flex gap-4">
					<label className="text-black text-opacity-80" htmlFor="authority">
						권한
					</label>
					<p className="font-medium">{userinfo.user.userRole}</p>
				</div>
			</div>
			{channel ? (
				<div
					className="ml-4 flex h-[6.375rem] w-[361px] flex-col  justify-center rounded border border-black border-opacity-10 bg-white "
					id="channelSection"
				>
					<div className="my-2 ml-4 flex gap-4">
						<label className="text-black text-opacity-80" htmlFor="school">
							채널
						</label>
						<p className="font-medium">{channel.channelName}</p>
					</div>
					<div className="my-2 ml-4 flex gap-4">
						<label className="text-black text-opacity-80" htmlFor="authority">
							코드
						</label>
						<p className="font-medium">{channel.entryCode}</p>
					</div>
				</div>
			) : (
				<div
					className="ml-4 flex h-[6.375rem] w-[361px] flex-col items-center justify-center rounded border border-black-100 bg-black-100"
					id="channelSection"
				>
					<p className="font-medium">채널 정보가 존재하지 않습니다.</p>
				</div>
			)}
			{userinfo.user.userRole === "teacher" && !channel ? (
				<MoveCreateChannelBtn />
			) : userinfo.user.userRole === "student" && !channel ? (
				<button
					className="mb-8 ml-4 flex h-[3.188rem] w-[361px] items-center justify-center rounded bg-tekhelet"
					id="button"
					onClick={handleModalOpen}
				>
					<p className="font-medium text-white">채널 참여</p>
				</button>
			) : (
				<button
					className="mb-8 ml-4 flex h-[3.188rem] w-[361px] items-center justify-center rounded bg-tekhelet"
					id="button"
					onClick={movePage}
				>
					<p className="font-medium text-white">채널 입장</p>
				</button>
			)}
		</>
	);
};

export default UserinfoSection;

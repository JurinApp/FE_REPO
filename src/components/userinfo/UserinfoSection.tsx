import { enterChannelModalState } from "@/states/confirmModalState";
import { userinfoState } from "@/states/userinfoState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import MoveCreateChannelBtn from "./MoveCreateChannelBtn";
import { IUserinfo } from "./UserinfoContainer";

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
		channelName: string;
		entryCode: string;
	};
}
const UserinfoSection = ({ userinfo, channel }: IUserinfoProps) => {
	const setIsEnterChannelModalOpen = useSetRecoilState(enterChannelModalState);
	// const authState = useRecoilValue(userinfoState);
	// const curAuth = authState.curAuth === "teacher" ? "학생" : "선생님";

	const handleModalOpen = () => {
		setIsEnterChannelModalOpen(true);
	};
	return (
		<>
			<div
				className="ml-4 flex h-[8.5rem] w-[361px] flex-col justify-center rounded border border-black border-opacity-10 bg-[#ffffff] "
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
					className="ml-4 flex h-[6.375rem] w-[361px] flex-col  justify-center rounded border border-black border-opacity-10 bg-[#ffffff] "
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
			) : (
				<button
					className="mb-8 ml-4 flex h-[3.188rem] w-[361px] items-center justify-center rounded bg-[#3d348b]"
					id="button"
					onClick={handleModalOpen}
				>
					<p className="font-medium text-white">채널 입장</p>
				</button>
			)}
		</>
	);
};

export default UserinfoSection;

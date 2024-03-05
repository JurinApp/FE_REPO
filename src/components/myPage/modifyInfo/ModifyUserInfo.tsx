import useModifyInfo from "@/hooks/mutations/modifyInfo/useModifyInfo";
import useInput from "@/hooks/useInput";
import { IChannel, IUser } from "@/interface/userAndChannelInfo";
import {
	modifyUserinfoModalState,
	quitChannelModalState,
} from "@/states/modalState/confirmModalState";
import { userRoleState } from "@/states/userRoleState";
import { FormEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ChannelQuitModal from "./ChannelQuitModal";
import { ConfirmModal } from "./ConfirmModal";

interface IModifyUserinfoProps {
	readonly userInfo: IUser;
	readonly channel: IChannel;
}

interface ISubmitData {
	readonly nickname: string;
	readonly schoolName: string;
	channelName?: string;
}

const ModifyUserInfo = ({ userInfo, channel }: IModifyUserinfoProps) => {
	const userRole = useRecoilValue(userRoleState);
	const [name, setName] = useInput(userInfo.user.nickname);
	const [schoolName, setSchoolName] = useInput(userInfo.user.schoolName);
	const [channelName, setChannelName] = useInput(
		channel === null ? "" : channel.channelName,
	);
	const { mutate } = useModifyInfo();

	const [isModifyUserInfoModalOpen, setIsModifyUserInfoModalOpen] =
		useRecoilState(modifyUserinfoModalState);
	const [isQuitChannelModalOpen, setIsQuitChannelModalOpen] = useRecoilState(
		quitChannelModalState,
	);

	const handleModifyUserinfoModal = (e: FormEvent) => {
		e.preventDefault();

		setIsModifyUserInfoModalOpen(true);
	};

	const handleQuitChannelModal = () => {
		setIsQuitChannelModalOpen(true);
	};

	const handleModifySubmit = () => {
		const submitData: ISubmitData = {
			nickname: name,
			schoolName: schoolName,
		};

		if (userRole === "teacher") {
			submitData.channelName = channelName;
		}

		mutate(submitData);
	};

	return (
		<>
			<div className="mb-4 flex flex-col justify-end gap-4 bg-white px-4 py-4">
				<h1 className="mx-4 text-[1.625rem] font-bold">프로필</h1>
				<form
					onSubmit={handleModifyUserinfoModal}
					className="mx-4 mt-4 flex h-auto flex-col gap-4 rounded"
				>
					<label htmlFor="name" className="font-bold">
						이름
					</label>
					<input
						type="text"
						id="name"
						placeholder={userInfo?.user.nickname}
						onChange={setName}
						autoComplete="off"
						className="border-b pb-2 placeholder-gray-300 focus:border-b focus:border-gray-700 focus:outline-none"
					/>
					<label htmlFor="school-name" className="font-bold">
						학교 이름
					</label>
					<input
						type="text"
						id="school-name"
						placeholder={userInfo?.user.schoolName}
						onChange={setSchoolName}
						autoComplete="off"
						className="border-b pb-2 placeholder-gray-300 focus:border-b focus:border-gray-700 focus:outline-none"
					/>
					{userRole === "teacher" && !!channel && (
						<>
							<label htmlFor="channel-name" className="font-bold">
								채널 이름
							</label>
							<input
								type="text"
								id="channel-name"
								placeholder={channel?.channelName}
								onChange={setChannelName}
								autoComplete="off"
								className="border-b pb-2 placeholder-gray-300 focus:border-b focus:border-gray-700 focus:outline-none"
							/>
						</>
					)}
					<div className="flex grow flex-col">
						<button
							type="button"
							className={`mb-4 mt-20 flex h-[3.188rem] items-center justify-center rounded border font-medium ${
								!channel
									? "border-black-300 bg-black-100 text-black-700"
									: "border-danger bg-white text-danger"
							} `}
							onClick={handleQuitChannelModal}
							disabled={!channel}
						>
							{userRole === "teacher" ? "채널 삭제" : "채널 탈퇴"}
						</button>
						<button
							className="flex h-[3.188rem] items-center justify-center rounded bg-tekhelet font-medium text-white"
							type="submit"
						>
							수정 완료
						</button>
					</div>
				</form>
			</div>
			{isModifyUserInfoModalOpen && (
				<ConfirmModal onConfirm={handleModifySubmit} />
			)}
			{isQuitChannelModalOpen && (
				<ChannelQuitModal
					channelId={channel.id}
					channelName={channel.channelName}
				/>
			)}
		</>
	);
};

export default ModifyUserInfo;

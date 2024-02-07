import useInput from "@/hooks/useInput";
import {
	modifyUserinfoModalState,
	quitChannelModalState,
} from "@/states/confirmModalState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ConfirmModal } from "./ConfirmModal";
import ChannelQuitModal from "./ChannelQuitModal";
import { userRoleState } from "@/states/userRoleState";
import useAxios from "@/hooks/useAxios";
import { IChannel, IUser } from "@/interface/userinfo";
import { IUserinfo } from "../userinfo/UserinfoContainer";
import { useNavigate } from "react-router";

interface IModifyUserinfoProps {
	userinfo: IUserinfo | undefined;
	channel: IChannel | undefined;
}

interface ISubmitData {
	readonly nickname: string;
	readonly schoolName: string;
	readonly channelName?: string;
}
const ModifyUserinfoSection = ({ userinfo, channel }: IModifyUserinfoProps) => {
	const navigate = useNavigate();
	const [name, setName] = useInput("");
	const { axiosData } = useAxios();
	const role = useRecoilValue(userRoleState);
	console.log(userinfo);
	const [schoolName, setSchoolName] = useInput("");
	const [channelName, setChannelName] = useInput("");
	const authState = useRecoilValue(userRoleState);
	const curAuth = authState === "teacher" ? "teacher" : "student";
	const setIsModifyUserinfoModalOpen = useSetRecoilState(
		modifyUserinfoModalState,
	);
	const setIsQuitChannelModalOpen = useSetRecoilState(quitChannelModalState);
	const handleModifyUserinfoModal = () => {
		setIsModifyUserinfoModalOpen(true);
	};

	const handleQuitChannelModal = () => {
		setIsQuitChannelModalOpen(true);
	};

	const handleModifySubmit = async () => {
		const apiUrl = `/${role}s/api/v1/users/profile`;

		const submitData: ISubmitData =
			role === "teacher"
				? {
						nickname: name || userinfo?.user.nickname,
						schoolName: schoolName || userinfo?.user.schoolName,
						channelName: channelName || channel?.channelName,
					}
				: {
						nickname: name || userinfo?.user.nickname,
						schoolName: schoolName || userinfo?.user.schoolName,
					};
		try {
			const response = await axiosData("useToken", {
				method: "PUT",
				url: apiUrl,
				data: submitData,
			});
			if (response) {
				const status = response.status;
				if (status === 200) {
					return response.data.data;
				}
			}
		} catch (error) {
			console.error(error);
		} finally {
			navigate("/mypage");
			setIsModifyUserinfoModalOpen(false);
		}
	};

	const handleQuitChannel = () => {
		if (curAuth === "teacher") {
			console.log("삭제 완료");
		}
		if (curAuth === "student") {
			console.log("탈퇴 완료");
		}
	};

	// 채널 조회 api
	// /students/api/v1/channels
	// /teachers/api/v1/channels

	// 채널 조회 api 진행 후, 채널 정보가 있다면 탈퇴 또는 삭제가 가능해야한다.
	return (
		<>
			<div className="flex h-full flex-col justify-end gap-4">
				<h1 className="mx-4 text-[1.625rem] font-bold">프로필</h1>
				<form
					className="mx-4 mb-16 mt-4 flex h-auto flex-col gap-4 rounded"
					id="modifySection"
				>
					<label htmlFor="name" className="font-bold">
						이름
					</label>
					<input
						type="text"
						id="name"
						placeholder={userinfo?.user.nickname}
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
						placeholder={userinfo?.user.schoolName}
						onChange={setSchoolName}
						autoComplete="off"
						className="border-b pb-2 placeholder-gray-300 focus:border-b focus:border-gray-700 focus:outline-none"
					/>
					{curAuth === "teacher" && !!channel && (
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
				</form>
				<button
					className={`mx-4 flex h-[3.188rem] items-center justify-center rounded border border-danger bg-white`}
					onClick={handleQuitChannelModal}
				>
					<p className={`font-medium text-danger`}>
						{curAuth === "teacher" ? "채널 삭제" : "채널 탈퇴"}
					</p>
				</button>
				<button
					className=" mx-4 mb-8 flex h-[3.188rem] items-center justify-center rounded bg-[#3d348b]"
					onClick={handleModifyUserinfoModal}
				>
					<p className="font-medium text-white">수정 완료</p>
				</button>
			</div>
			<ConfirmModal onConfirm={handleModifySubmit} />
			<ChannelQuitModal
				channelName={channelName}
				onDelete={handleQuitChannel}
			/>
		</>
	);
};

export default ModifyUserinfoSection;

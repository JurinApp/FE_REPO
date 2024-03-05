import useInput from "@/hooks/useInput";
import {
	modifyUserinfoModalState,
	quitChannelModalState,
} from "@/states/modalState/confirmModalState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ConfirmModal } from "./ConfirmModal";
import ChannelQuitModal from "./ChannelQuitModal";
import { userRoleState } from "@/states/userRoleState";
import useAxios from "@/hooks/useAxios";
import { IChannel } from "@/interface/userinfo";
import { IUserinfo } from "../userinfo/UserinfoContainer";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
	const queryClient = useQueryClient();
	const role = useRecoilValue(userRoleState);
	const { axiosData } = useAxios();

	const [name, setName] = useInput("");
	const [schoolName, setSchoolName] = useInput("");
	const [channelName, setChannelName] = useInput("");

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

	const modifyUserinfo = async (submitData: ISubmitData) => {
		const apiUrl = `/${role}s/api/v1/users/profile`;

		const response = await axiosData("useToken", {
			method: "PUT",
			url: apiUrl,
			data: submitData,
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				alert("정보 수정이 완료 되었습니다.");
				navigate("/mypage");
				setIsModifyUserinfoModalOpen(false);
				return response.data.data;
			}
		}
	};

	const { mutate } = useMutation({
		mutationFn: modifyUserinfo,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userinfo"] });
			queryClient.invalidateQueries({ queryKey: ["channelInfo"] });
		},
	});

	const handleModifySubmit = () => {
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
		mutate(submitData);
	};

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
					{role === "teacher" && !!channel && (
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
					className={`mx-4 flex h-[3.188rem] items-center justify-center rounded border  ${
						!channel
							? "border-black-300 bg-black-100"
							: "border-danger bg-white"
					} `}
					onClick={handleQuitChannelModal}
					disabled={!channel}
				>
					<p
						className={`font-medium ${
							!channel ? "text-black-700" : "text-danger"
						}`}
					>
						{role === "teacher" ? "채널 삭제" : "채널 탈퇴"}
					</p>
				</button>
				<button
					className=" mx-4 mb-8 flex h-[3.188rem] items-center justify-center rounded bg-tekhelet"
					onClick={handleModifyUserinfoModal}
				>
					<p className="font-medium text-white">수정 완료</p>
				</button>
			</div>
			<ConfirmModal onConfirm={handleModifySubmit} />
			{channel && <ChannelQuitModal />}
		</>
	);
};

export default ModifyUserinfoSection;

import useInput from "@/hooks/useInput";
import { modifyUserinfoModalState } from "@/states/confirmModalState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ConfirmModal } from "./ConfirmModal";
import { userinfoState } from "@/states/userinfoState";

const ModifyUserinfoSection = () => {
	const [name, setName] = useInput("");
	const [schoolName, setSchoolName] = useInput("");
	const [channelName, setChannelName] = useInput("");
	const authState = useRecoilValue(userinfoState);
	const curAuth = authState.curAuth === "teacher" ? "선생님" : "학생";
	const setIsModifyUserinfoModalState = useSetRecoilState(
		modifyUserinfoModalState,
	);
	const handleModifyUserinfoModalOpen = () => {
		setIsModifyUserinfoModalState(true);
	};
	const handleSubmit = () => {
		// TODO: 수정 API 요청.
		console.log(name, schoolName, channelName);
	};

	return (
		<>
			<div className="flex h-full flex-col justify-end gap-4">
				<h1 className="mx-4 text-[1.625rem] font-bold">프로필</h1>
				<div
					className="mx-4 mb-16 mt-4 flex h-auto flex-col gap-4 rounded"
					id="modifySection"
				>
					<label htmlFor="name" className="font-bold">
						이름
					</label>
					<input
						type="text"
						id="name"
						placeholder="이름"
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
						placeholder="학교 이름"
						onChange={setSchoolName}
						autoComplete="off"
						className="border-b pb-2 placeholder-gray-300 focus:border-b focus:border-gray-700 focus:outline-none"
					/>
					{curAuth === "선생님" && (
						<>
							<label htmlFor="channel-name" className="font-bold">
								채널 이름
							</label>
							<input
								type="text"
								id="channel-name"
								placeholder="채널 이름"
								onChange={setChannelName}
								autoComplete="off"
								className="border-b pb-2 placeholder-gray-300 focus:border-b focus:border-gray-700 focus:outline-none"
							/>
						</>
					)}
				</div>
				<button
					className="mx-4 mb-8 flex h-[3.188rem] items-center justify-center rounded bg-[#3d348b]"
					id="button"
					onClick={handleModifyUserinfoModalOpen}
				>
					<p className="font-medium text-white">수정하기</p>
				</button>
			</div>{" "}
			<ConfirmModal onConfirm={handleSubmit} />
		</>
	);
};

export default ModifyUserinfoSection;

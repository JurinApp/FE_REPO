import { quitChannelModalState } from "@/states/confirmModalState";
import { userRoleState } from "@/states/userRoleState";
import { userinfoState } from "@/states/userinfoState";
import { useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface IChannelQuitModalProps {
	readonly channelName: "string";
	readonly onDelete: () => void;
}
const ChannelQuitModal = ({
	onDelete,
	channelName,
}: IChannelQuitModalProps) => {
	const [isQuitChannelModalOpen, setIsQuitChannelModalOpen] = useRecoilState(
		quitChannelModalState,
	);
	const modalRef = useRef(null);
	const authState = useRecoilValue(userRoleState);
	const curAuth = authState === "teacher" ? "선생님" : "학생";

	const handleModalClose = () => {
		setIsQuitChannelModalOpen(false);
	};

	let message =
		curAuth === "선생님" ? "삭제하시겠습니까?" : "탈퇴하시겠습니까?";

	return (
		<>
			<div
				className={`fixed left-0 top-0 z-[100] ${
					isQuitChannelModalOpen ? "flex" : "hidden"
				} h-full w-full flex-col items-center justify-center bg-black-700`}
			>
				<div ref={modalRef} className="w-[20rem]">
					<div className="bg-opacity-2 flex h-[11.75rem] flex-col items-center justify-center bg-white">
						<p className="font-medium text-black">
							<span className="font-bold">{channelName}</span> 채널을 <br />
							{message}
						</p>
						<p className="text-[0.875rem] font-normal text-danger">
							삭제 시 채널 내 아이템 및 정보가 삭제됩니다.
						</p>
					</div>
					<div className="flex h-[3.75rem] flex-row">
						<button className="w-1/2 bg-gray-300" onClick={handleModalClose}>
							취소
						</button>
						<button className="w-1/2 bg-danger text-white" onClick={onDelete}>
							삭제
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChannelQuitModal;

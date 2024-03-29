import useDeleteAndQuitChannel from "@/hooks/queries/myPage/useDeleteAndQuitChannel";
import { quitChannelModalState } from "@/states/modalState/confirmModalState";
import { userRoleState } from "@/states/userRoleState";
import { useEffect, useMemo, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface ChannelQuitModalProps {
	readonly channelId: number;
	readonly channelName: string;
}

const ChannelQuitModal = ({
	channelId,
	channelName,
}: ChannelQuitModalProps) => {
	const userRole = useRecoilValue(userRoleState);
	const setIsQuitChannelModalOpen = useSetRecoilState(quitChannelModalState);
	const modalRef = useRef<HTMLDivElement>(null);
	const { mutate } = useDeleteAndQuitChannel();

	const message = useMemo(() => {
		return userRole === "teacher" ? "삭제하시겠습니까?" : "탈퇴하시겠습니까?";
	}, [userRole]);

	const handleDeleteOrQuitChannel = () => {
		mutate(channelId);
	};

	const handleModalClose = () => {
		setIsQuitChannelModalOpen(false);
	};

	useEffect(() => {
		const handleOutSideClick = (e: Event) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setIsQuitChannelModalOpen(false);
			}
		};
		document.addEventListener("mousedown", handleOutSideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutSideClick);
		};
	}, [modalRef]);

	return (
		<>
			<div className="fixed left-0 top-0 z-[100] flex h-full w-full flex-col items-center justify-center bg-black-700">
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
						<button
							className="w-1/2 bg-danger text-white"
							onClick={handleDeleteOrQuitChannel}
						>
							{userRole === "teacher" ? "삭제" : "탈퇴"}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChannelQuitModal;

import { deleteDetailPostModalState } from "@/states/confirmModalState";
import { userRoleState } from "@/states/userRoleState";
import { useRecoilValue, useSetRecoilState } from "recoil";

const DeletePostButton = () => {
	const userRole = useRecoilValue(userRoleState);
	const setIsOpenModal = useSetRecoilState(deleteDetailPostModalState);

	const openDeleteDetailPostHandler = () => {
		setIsOpenModal(true);
	};

	return (
		<div
			className={`${
				userRole === "student" ? "hidden" : "flex"
			} absolute bottom-2 mx-auto w-full justify-center px-4 sm:bottom-6 sm:px-0`}
		>
			<button
				className="h-box-height w-full rounded-[0.25rem] border border-danger bg-white font-bold text-danger sm:w-[22.563rem]"
				onClick={openDeleteDetailPostHandler}
			>
				삭제
			</button>
		</div>
	);
};

export default DeletePostButton;

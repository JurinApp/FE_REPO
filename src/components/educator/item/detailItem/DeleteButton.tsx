import { deleteDetailItemModalState } from "@/states/confirmModalState";
import { useSetRecoilState } from "recoil";

const DeleteButton = () => {
	const setIsOpenDeleteDetailItemModal = useSetRecoilState(
		deleteDetailItemModalState,
	);

	const clickDeleteBtnHandler = () => {
		setIsOpenDeleteDetailItemModal(true);
	};

	return (
		<div className="absolute bottom-6 mx-auto flex w-full justify-center">
			<button
				className="h-box-height w-full rounded-[0.25rem] border border-stock-red bg-white font-bold text-stock-red sm:w-[22.563rem]"
				onClick={clickDeleteBtnHandler}
			>
				삭제
			</button>
		</div>
	);
};

export default DeleteButton;

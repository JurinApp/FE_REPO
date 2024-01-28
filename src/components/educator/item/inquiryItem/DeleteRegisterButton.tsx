import { deleteItemsModalState } from "@/states/confirmModalState";
import { selectedItemState } from "@/states/selectedItemState";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const DeleteRegisterButton = () => {
	const selectedItems = useRecoilValue(selectedItemState);
	const isExistSelectedItems = selectedItems.length !== 0;
	const setIsOpenDeleteItemsModal = useSetRecoilState(deleteItemsModalState);

	const clickOpenDeleteItemsModalHandler = () => {
		setIsOpenDeleteItemsModal(true);
	};

	return (
		<div className="absolute bottom-6 left-0 flex w-full px-4">
			<button
				type="button"
				className="h-box-height grow rounded-[0.25rem] border border-danger bg-white font-bold text-danger disabled:border-black-300 disabled:bg-black-100 disabled:text-black-300"
				disabled={!isExistSelectedItems}
				onClick={clickOpenDeleteItemsModalHandler}
			>
				삭제
			</button>
			<Link
				to="/item/register"
				className="ml-2 flex h-box-height grow items-center justify-center rounded bg-tekhelet font-bold text-white"
			>
				등록
			</Link>
		</div>
	);
};

export default DeleteRegisterButton;
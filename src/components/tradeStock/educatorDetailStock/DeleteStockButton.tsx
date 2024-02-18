import { deleteDetailTradeStockModalState } from "@/states/modalState/confirmModalState";
import { useSetRecoilState } from "recoil";

const DeleteStockButton = () => {
	const setIsOpenModal = useSetRecoilState(deleteDetailTradeStockModalState);

	const handleDeleteTradeStock = () => {
		setIsOpenModal(true);
	};

	return (
		<div className="absolute bottom-4 mx-auto flex w-full justify-center px-4 sm:bottom-6 sm:px-0">
			<button
				className="h-box-height w-full rounded-[0.25rem] border border-danger bg-white font-bold text-danger sm:w-[22.563rem]"
				onClick={handleDeleteTradeStock}
			>
				삭제
			</button>
		</div>
	);
};

export default DeleteStockButton;

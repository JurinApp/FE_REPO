import { deleteStocksModalState } from "@/states/confirmModalState";
import { selectedStock } from "@/states/tradeStock";
import { useRecoilValue, useSetRecoilState } from "recoil";

const DeleteRegisterButton = () => {
	const selectedStocks = useRecoilValue(selectedStock);
	const setIsOpenDeleteStocksModal = useSetRecoilState(deleteStocksModalState);

	const deleteStocksHandler = () => {
		setIsOpenDeleteStocksModal(true);
	};

	return (
		<div className="flex w-full">
			<button
				type="button"
				disabled={selectedStocks.length === 0 ? true : false}
				className="mr-1 h-box-height grow rounded border border-danger bg-white font-bold text-danger disabled:border-black-300 disabled:bg-black-100 disabled:text-black-300 "
				onClick={deleteStocksHandler}
			>
				삭제
			</button>
			<button
				type="button"
				className="ml-1 h-box-height grow rounded bg-tekhelet font-bold text-white"
			>
				등록
			</button>
		</div>
	);
};

export default DeleteRegisterButton;

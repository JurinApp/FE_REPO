import { deleteStocksModalState } from "@/states/confirmModalState";
import { selectedStock } from "@/states/tradeStock";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";

const DeleteRegisterButton = () => {
	const selectedStocks = useRecoilValue(selectedStock);
	const setIsOpenDeleteStocksModal = useSetRecoilState(deleteStocksModalState);

	const deleteStocksHandler = () => {
		setIsOpenDeleteStocksModal(true);
	};

	return (
		<div className="absolute bottom-6 left-0 flex w-full px-4">
			<button
				type="button"
				disabled={selectedStocks.length === 0 ? true : false}
				className="mr-1 h-box-height grow rounded border border-danger bg-white font-bold text-danger disabled:border-black-300 disabled:bg-black-100 disabled:text-black-300 "
				onClick={deleteStocksHandler}
			>
				삭제
			</button>
			<Link
				to="/trade/stock/register"
				type="button"
				className="ml-1 flex h-box-height grow items-center justify-center rounded bg-tekhelet font-bold text-white"
			>
				등록
			</Link>
		</div>
	);
};

export default DeleteRegisterButton;

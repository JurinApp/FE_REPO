import GoBackButton from "@components/common/GoBackButton/GoBackButton";
import { Link, useParams } from "react-router-dom";
import Edit from "@assets/svg/btn_edit.svg?react";
import DetailTradeStockInfo from "./DetailTradeStockInfo";
import DeleteTradeStockButton from "./DeleteTradeStockButton";
import { deleteDetailTradeStockModalState } from "@/states/confirmModalState";
import { useRecoilValue } from "recoil";
import DeleteTradeStockModal from "./DeleteTradeStockModal";

const DetailTradeStockContainer = () => {
	const { stockId } = useParams();
	const isOpenDeleteDetailTradeStockModal = useRecoilValue(
		deleteDetailTradeStockModalState,
	);

	return (
		<div className="relative mx-auto w-full bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<GoBackButton />
			<div className="h-[calc(100vh-8rem)]">
				<Link
					to={`/trade/stock/edit/${stockId}`}
					className="my-1 flex flex-row-reverse px-4 sm:my-[0.875rem]"
				>
					<Edit />
				</Link>
				<DetailTradeStockInfo />
				<DeleteTradeStockButton />
			</div>
			{isOpenDeleteDetailTradeStockModal && <DeleteTradeStockModal />}
		</div>
	);
};

export default DetailTradeStockContainer;

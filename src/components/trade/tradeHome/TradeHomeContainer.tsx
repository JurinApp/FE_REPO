import { deleteStocksModalState } from "@/states/confirmModalState";
import DeleteRegisterButton from "./DeleteRegisterButton";
import TradeHomeHeading from "./TradeHomeHeading";
import TradeStockList from "./TradeStockList";
import { useRecoilValue } from "recoil";
import DeleteStocksModal from "./DeleteStocksModal";

const STOCK_LIST = [
	{
		key: "1",
		stockId: "1",
		stockName: "선생님의 몸무게",
		stockPrice: 700,
		pastStockPrice: 800,
	},
	{
		key: "2",
		stockId: "2",
		stockName: "르세라핌 - Perfect Night",
		stockPrice: 180,
		pastStockPrice: 900,
	},
	{
		key: "3",
		stockId: "3",
		stockName: "선생님의 몸무게",
		stockPrice: 700,
		pastStockPrice: 1000,
	},
	{
		key: "4",
		stockId: "4",
		stockName: "선생님의 몸무게",
		stockPrice: 700,
		pastStockPrice: 400,
	},
];

const TradeHomeContainer = () => {
	const isOpenDeleteStocksModal = useRecoilValue(deleteStocksModalState);

	return (
		<div className="relative mx-auto h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
			<div className="px-4">
				<TradeHomeHeading stockList={STOCK_LIST} />
				<TradeStockList stockList={STOCK_LIST} />
				<DeleteRegisterButton />
			</div>
			{isOpenDeleteStocksModal && <DeleteStocksModal />}
		</div>
	);
};

export default TradeHomeContainer;

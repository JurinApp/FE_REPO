import { IStockItem } from "@/interface/tradeHome";
import { selectedStock } from "@/states/tradeStock";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import IcLow from "@assets/svg/icLow.svg?react";
import IcHigh from "@assets/svg/icHigh.svg?react";

interface TradeStockItemProps {
	readonly stockItem: IStockItem;
}

const TradeStockItem = ({ stockItem }: TradeStockItemProps) => {
	const [selectedStocks, setSelectedStocks] = useRecoilState(selectedStock);

	const clickStockHandler = () => {
		const index = selectedStocks.findIndex((stockId) => {
			return stockId === stockItem.stockId;
		});

		if (index === -1) {
			setSelectedStocks([...selectedStocks, stockItem.stockId]);
		} else {
			const deepCopySelectedStocks = [...selectedStocks];
			deepCopySelectedStocks.splice(index, 1);
			setSelectedStocks(deepCopySelectedStocks);
		}
	};

	useEffect(() => {
		return () => {
			setSelectedStocks([]);
		};
	}, []);

	return (
		<div className="mt-2 flex h-[2.875rem] items-center">
			<div className="mr-3 flex h-full items-center">
				<label className="hidden" htmlFor="checkLearner">
					학생선택
				</label>
				<input
					onChange={clickStockHandler}
					type="checkbox"
					id="checkLearner"
					className="h-6 w-6"
					checked={selectedStocks.includes(stockItem.stockId) ? true : false}
				/>
			</div>
			<div
				className={`mx-auto flex h-full w-full items-center justify-between rounded border border-black-100 bg-white sm:w-item-width`}
			>
				<div className="flex h-full grow items-center justify-between pl-4 text-sm text-black-800">
					<p>{stockItem.stockName}</p>
					<div className="mr-[0.875rem] flex text-sm font-medium">
						<div className="flex items-center">
							<p className="text-stock-blue mr-[0.125rem]">700</p>
							<IcLow />
						</div>
						<p className="text-stock-blue ml-[0.125rem] w-12 text-right">
							1.6%
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TradeStockItem;

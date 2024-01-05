import { IStockItem } from "@/interface/tradeHome";
import { allCheckStockState, selectedStock } from "@/states/tradeStock";
import { ChangeEvent, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

interface ITradeHomeHeadingProps {
	readonly stockList: IStockItem[];
}

const TradeHomeHeading = ({ stockList }: ITradeHomeHeadingProps) => {
	const checkBoxRef = useRef<HTMLInputElement>(null);
	const [isAllCheckStock, setIsAllCheckStock] =
		useRecoilState(allCheckStockState);
	const [selectedStocks, setSelectedStocks] = useRecoilState(selectedStock);

	const clickAllCheckStockHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const isCheck = e.target.checked;

		if (isCheck) {
			const learnerIdArr = stockList.map((stock) => stock.stockId);

			setSelectedStocks(learnerIdArr);
			setIsAllCheckStock(true);
		} else {
			setSelectedStocks([]);
			setIsAllCheckStock(false);
		}
	};

	useEffect(() => {
		if (selectedStocks.length === stockList.length) {
			setIsAllCheckStock(true);
		} else {
			setIsAllCheckStock(false);
		}
	}, [selectedStocks]);

	return (
		<div className="mt-[1.375rem] flex w-full justify-between text-black-800">
			<div className="flex items-center">
				<input
					ref={checkBoxRef}
					type="checkbox"
					id="checkAll"
					className="h-6 w-6"
					checked={isAllCheckStock}
					onChange={clickAllCheckStockHandler}
				/>
				<label
					htmlFor="checkAll"
					className="ml-2 flex h-full items-center text-sm"
				>
					전체 선택
				</label>
			</div>
			<h1 className="font-bold">
				주식종목 <span>({stockList.length})</span>
			</h1>
		</div>
	);
};

export default TradeHomeHeading;

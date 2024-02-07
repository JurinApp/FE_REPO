import { IStockItem } from "@/interface/tradeHome";
import { allCheckStockState, selectedStock } from "@/states/tradeStock";
import { ChangeEvent, useEffect, useRef } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

interface ITradeHomeHeadingProps {
	readonly stockList: IStockItem[];
}

const TradeHomeHeading = ({ stockList }: ITradeHomeHeadingProps) => {
	const checkBoxRef = useRef<HTMLInputElement>(null);
	const [isAllCheckStock, setIsAllCheckStock] =
		useRecoilState(allCheckStockState);
	const resetIsAllCheckStock = useResetRecoilState(allCheckStockState);
	const [selectedStocks, setSelectedStocks] = useRecoilState(selectedStock);

	const handleAllCheckStock = (e: ChangeEvent<HTMLInputElement>) => {
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

	useEffect(() => {
		return () => {
			if (isAllCheckStock) {
				resetIsAllCheckStock();
			}
		};
	}, []);

	return (
		<div className="flex h-12 w-full items-center justify-between pt-[0.625rem] text-black-800">
			<div className="flex items-center">
				<input
					ref={checkBoxRef}
					type="checkbox"
					id="checkAll"
					className="custom-checkBox cursor-pointer"
					checked={isAllCheckStock}
					onChange={handleAllCheckStock}
				/>
				<label
					htmlFor="checkAll"
					className="ml-2 flex h-full cursor-pointer items-center text-sm"
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

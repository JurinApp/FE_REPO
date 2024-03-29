import { IStockHomeResponseData } from "@/interface/stock";
import {
	allCheckStockState,
	selectedStock,
} from "@/states/selectedState/selectedTradeStock";
import { userRoleState } from "@/states/userRoleState";
import { ChangeEvent, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

interface ITradeHomeHeadingProps {
	readonly stockList: IStockHomeResponseData[];
}

const TradeHomeHeading = ({ stockList }: ITradeHomeHeadingProps) => {
	const checkBoxRef = useRef<HTMLInputElement>(null);
	const [isAllCheckStock, setIsAllCheckStock] =
		useRecoilState(allCheckStockState);
	const resetIsAllCheckStock = useResetRecoilState(allCheckStockState);
	const [selectedStocks, setSelectedStocks] = useRecoilState(selectedStock);
	const userRole = useRecoilValue(userRoleState);

	const flatStockList = stockList.flatMap((stock) => {
		return stock.results.flatMap((result) => {
			return result;
		});
	});

	const handleAllCheckStock = (e: ChangeEvent<HTMLInputElement>) => {
		const isCheck = e.target.checked;

		if (isCheck) {
			const learnerIdArr = flatStockList.map((stock) => stock.id);

			setSelectedStocks(learnerIdArr);
			setIsAllCheckStock(true);
		} else {
			setSelectedStocks([]);
			setIsAllCheckStock(false);
		}
	};

	useEffect(() => {
		if (selectedStocks.length === flatStockList.length) {
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
		<div
			className={`${
				userRole === "teacher" ? "flex items-center justify-between" : "hidden"
			} h-12 w-full pt-[0.625rem] text-black-800`}
		>
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
				주식종목 <span>({flatStockList.length})</span>
			</h1>
		</div>
	);
};

export default TradeHomeHeading;

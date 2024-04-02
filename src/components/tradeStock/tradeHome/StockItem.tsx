import { IStockItem } from "@/interface/tradeHome";
import { selectedStock } from "@/states/selectedState/selectedTradeStock";
import IcLow from "@assets/svg/icLow.svg?react";
import IcHigh from "@assets/svg/icHigh.svg?react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link, useParams } from "react-router-dom";
import { userRoleState } from "@/states/userRoleState";
import { useMemo } from "react";

interface TradeStockItemProps {
	readonly stockItem: IStockItem;
}

const StockItem = ({ stockItem }: TradeStockItemProps) => {
	const [selectedStocks, setSelectedStocks] = useRecoilState(selectedStock);
	const userRole = useRecoilValue(userRoleState);
	const { channelId } = useParams();
	const detailLocation =
		userRole === "teacher"
			? `/${channelId}/trade/stock/detail/${stockItem.id}`
			: `/${channelId}/stock/${stockItem.id}`;

	const isLow = useMemo(() => {
		return stockItem.daysRangeRate[0] === "-";
	}, [stockItem]);

	const isEqual = useMemo(() => {
		return stockItem.daysRangeRate === "0.00%";
	}, [stockItem]);

	const handleCheckStock = () => {
		const index = selectedStocks.findIndex((stockId) => {
			return stockId === stockItem.id;
		});

		if (index === -1) {
			setSelectedStocks([...selectedStocks, stockItem.id]);
		} else {
			const deepCopySelectedStocks = [...selectedStocks];
			deepCopySelectedStocks.splice(index, 1);
			setSelectedStocks(deepCopySelectedStocks);
		}
	};

	return (
		<div className="mt-2 flex h-[2.875rem] items-center">
			<div
				className={`mr-3 h-full ${
					userRole === "teacher" ? "flex items-center" : "hidden"
				}`}
			>
				<label className="hidden" htmlFor="checkLearner">
					주식선택
				</label>
				<input
					onChange={handleCheckStock}
					type="checkbox"
					id="checkLearner"
					className="custom-checkBox hidden cursor-pointer"
					checked={selectedStocks.includes(stockItem.id) ? true : false}
				/>
			</div>
			<Link
				to={detailLocation}
				className={`mx-auto flex h-full w-full cursor-pointer items-center justify-between rounded border border-black-100 bg-white sm:w-item-width`}
			>
				<div className="flex h-full grow items-center justify-between pl-4 text-sm text-black-800">
					<p>{stockItem.name}</p>
					<div className="mr-[0.875rem] flex text-sm font-medium">
						<div className="flex items-center">
							<p
								className={`mr-[0.125rem]${
									isLow
										? "text-stock-sell"
										: isEqual
											? "text-black-800"
											: "text-stock-buy"
								}`}
							>
								{stockItem.purchasePrice}
							</p>
							{isLow ? (
								<IcLow />
							) : isEqual ? (
								<>
									<div className="h-[17px] w-[14px]" />
								</>
							) : (
								<IcHigh />
							)}
						</div>
						<p
							className={`ml-[0.125rem] w-12 text-right ${
								isLow
									? "text-stock-sell"
									: isEqual
										? "text-black-800"
										: "text-stock-buy"
							}`}
						>
							{stockItem.daysRangeRate}
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default StockItem;

import { ITodayTradeStockItem } from "@/interface/stock";
import { userRoleState } from "@/states/userRoleState";
import IcLow from "@assets/svg/icLow.svg?react";
import IcHigh from "@assets/svg/icHigh.svg?react";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

interface TradeStockItemProps {
	readonly stockItem: ITodayTradeStockItem;
}

const TodayTradeStockItem = ({ stockItem }: TradeStockItemProps) => {
	const userRole = useRecoilValue(userRoleState);
	const { channelId } = useParams();

	const pageLocation = useMemo(() => {
		return userRole === "teacher"
			? `/${channelId}/trade/stock/detail/${stockItem.id}`
			: `/${channelId}/stock/${stockItem.id}`;
	}, [userRole]);

	const isLow = useMemo(() => {
		return stockItem.daysRangeRate[0] === "-";
	}, [stockItem]);

	const isEqual = useMemo(() => {
		return stockItem.daysRangeRate === "0.00%";
	}, [stockItem]);

	return (
		<Link to={pageLocation} className="mt-2 flex h-[2.875rem] items-center">
			<div
				className={`mx-auto flex h-full w-full items-center justify-between rounded border border-black-100 bg-white sm:w-item-width`}
			>
				<div className="flex h-full grow items-center justify-between pl-4 text-sm text-black-800">
					<p>{stockItem.name}</p>
					<div className="mr-[0.875rem] flex text-sm font-medium">
						<div className="flex items-center">
							<p
								className={`mr-[0.125rem] ${
									isLow
										? "text-stock-sell"
										: isEqual
											? "text-black-800"
											: "text-stock-buy"
								}`}
							>
								{stockItem.daysRangePrice}
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
			</div>
		</Link>
	);
};

export default TodayTradeStockItem;

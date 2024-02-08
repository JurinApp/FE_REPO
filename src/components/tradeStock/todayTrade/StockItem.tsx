import { IStockItem } from "@/interface/tradeHome";
import { userRoleState } from "@/states/userRoleState";
import IcLow from "@assets/svg/icLow.svg?react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

interface TradeStockItemProps {
	readonly stockItem: IStockItem;
}

const TradeStockItem = ({ stockItem }: TradeStockItemProps) => {
	const userRole = useRecoilValue(userRoleState);
	const { channelId } = useParams();
	const pageLocation =
		userRole === "teacher"
			? `/${channelId}/trade/stock/detail/${stockItem.id}`
			: `/${channelId}/stock`;

	return (
		<Link to={pageLocation} className="mt-2 flex h-[2.875rem] items-center">
			<div
				className={`mx-auto flex h-full w-full items-center justify-between rounded border border-black-100 bg-white sm:w-item-width`}
			>
				<div className="flex h-full grow items-center justify-between pl-4 text-sm text-black-800">
					<p>{stockItem.name}</p>
					<div className="mr-[0.875rem] flex text-sm font-medium">
						<div className="flex items-center">
							<p className="mr-[0.125rem] text-stock-blue">
								{stockItem.daysRangePrice}
							</p>
							<IcLow />
						</div>
						<p className="ml-[0.125rem] w-12 text-right text-stock-blue">
							{stockItem.daysRangeRate}%
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default TradeStockItem;

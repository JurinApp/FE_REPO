import { IStockItem } from "@/interface/tradeHome";
import IcLow from "@assets/svg/icLow.svg?react";

interface TradeStockItemProps {
	readonly stockItem: IStockItem;
}

const TradeStockItem = ({ stockItem }: TradeStockItemProps) => {
	return (
		<div className="mt-2 flex h-[2.875rem] items-center">
			<div
				className={`mx-auto flex h-full w-full items-center justify-between rounded border border-black-100 bg-white sm:w-item-width`}
			>
				<div className="flex h-full grow items-center justify-between pl-4 text-sm text-black-800">
					<p>{stockItem.stockName}</p>
					<div className="mr-[0.875rem] flex text-sm font-medium">
						<div className="flex items-center">
							<p className="mr-[0.125rem] text-stock-blue">700</p>
							<IcLow />
						</div>
						<p className="ml-[0.125rem] w-12 text-right text-stock-blue">
							1.6%
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TradeStockItem;

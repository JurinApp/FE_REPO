import { IMyStock } from "@/interface/stock";
import IcLow from "@assets/svg/icLow.svg?react";
import IcHigh from "@assets/svg/icHigh.svg?react";
import { useMemo } from "react";

interface IMyStockItem {
	readonly myStock: IMyStock;
}

const MyStockItem = ({ myStock }: IMyStockItem) => {
	const isLow = useMemo(() => {
		return myStock.daysRangeRate[0] === "-";
	}, [myStock]);

	const isEqual = useMemo(() => {
		return myStock.daysRangeRate === "0.00%";
	}, [myStock]);

	return (
		<div className="mt-2 flex h-[2.875rem] items-center">
			<div
				className={`mx-auto flex h-full w-full cursor-pointer items-center justify-between rounded border border-black-100 bg-white sm:w-item-width`}
			>
				<div className="flex h-full grow items-center justify-between pl-4 text-sm text-black-800">
					<p>{myStock.name}</p>
					<div className="mr-[0.875rem] flex text-sm font-medium">
						<div className="flex items-center">
							<p
								className={`mr-[0.125rem] ${
									isLow
										? "text-stock-blue"
										: isEqual
											? "text-black-800"
											: "text-stock-red"
								}`}
							>
								{myStock.daysRangePrice}
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
									? "text-stock-blue"
									: isEqual
										? "text-black-800"
										: "text-stock-red"
							}`}
						>
							{myStock.daysRangeRate}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyStockItem;

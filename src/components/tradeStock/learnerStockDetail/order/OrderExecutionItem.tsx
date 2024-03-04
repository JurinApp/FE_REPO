import { IOrderExecution } from "@/interface/stock";
import IcLow from "@assets/svg/icLow.svg?react";
import IcHigh from "@assets/svg/icHigh.svg?react";
import { useMemo } from "react";

interface IOrderExecutionItemProps {
	readonly order: IOrderExecution;
}

const OrderExecutionItem = ({ order }: IOrderExecutionItemProps) => {
	const isLow = useMemo(() => {
		return order.daysRangeRate[0] === "-";
	}, [order]);

	const isEqual = useMemo(() => {
		return order.daysRangeRate === "0.00%";
	}, [order]);

	return (
		<div className="mb-2 flex h-[2.875rem] w-full items-center justify-around rounded border border-black-100 bg-white px-[0.875rem] text-sm">
			<p className="grow truncate text-black-800">{order.name}</p>
			<div className="flex">
				<div className="flex items-center">
					<p
						className={`${
							isLow
								? "text-stock-sell"
								: isEqual
									? "text-black"
									: "text-stock-buy"
						} mr-1`}
					>
						{order.daysRangePrice}
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
					className={`ml-[0.875rem] ${
						isLow
							? "text-stock-sell"
							: isEqual
								? "text-black"
								: "text-stock-buy"
					} `}
				>
					{order.daysRangeRate}
				</p>
			</div>
			<p className="ml-[0.875rem] text-black-800">{order.amount}</p>
		</div>
	);
};

export default OrderExecutionItem;

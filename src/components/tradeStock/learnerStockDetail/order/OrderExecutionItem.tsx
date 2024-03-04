import { IOrderExecution } from "@/interface/stock";
import IcLow from "@assets/svg/icLow.svg?react";
import IcHigh from "@assets/svg/icHigh.svg?react";

interface IOrderExecutionItemProps {
	readonly order: IOrderExecution;
}

const OrderExecutionItem = ({ order }: IOrderExecutionItemProps) => {
	return (
		<div className="mb-2 flex h-[2.875rem] w-full items-center justify-around rounded border border-black-100 bg-white px-[0.875rem] text-sm">
			<p className="grow truncate text-black-800">{order.name}</p>
			<div className="flex">
				<div className="flex items-center">
					<p className="mr-1">{order.price}</p>
					<IcLow />
				</div>
				<p className="ml-[0.875rem]">{order.daysRangeRate}</p>
			</div>
			<p className="ml-[0.875rem] text-black-800">{order.amount}</p>
		</div>
	);
};

export default OrderExecutionItem;

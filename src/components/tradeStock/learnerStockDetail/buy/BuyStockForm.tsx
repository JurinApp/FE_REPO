import useBuyStock from "@/hooks/mutations/studentTradeDetail/useBuyStock";
import { IStockPriceInfo, IUserPointInfo } from "@/interface/stock";
import Minus from "@assets/svg/minus.svg?react";
import Plus from "@assets/svg/plus.svg?react";
import PointLogo from "@assets/svg/point.svg?react";
import { FormEvent, useState } from "react";

interface IBuyInterfaceProps {
	readonly userPointInfo: IUserPointInfo;
	readonly stockPriceInfo: IStockPriceInfo;
}

const BuyStockForm = ({
	userPointInfo,
	stockPriceInfo,
}: IBuyInterfaceProps) => {
	const [stockCount, setStockCount] = useState<number>(1);
	const { mutate } = useBuyStock(stockCount);

	const increaseStockCount = () => {
		setStockCount(stockCount + 1);
	};

	const decreaseStockCount = () => {
		if (stockCount <= 1) return;
		setStockCount(stockCount - 1);
	};

	const checkCanBuyStock = () => {
		let result = false;
		const buyStockTotalPrice = stockPriceInfo.purchasePrice * stockCount;

		if (userPointInfo.point >= buyStockTotalPrice) {
			result = true;
		}

		return result;
	};

	const handleBuyStock = (e: FormEvent) => {
		e.preventDefault();

		const confirmBuyStockAlert = () => {
			const result = confirm("매수를 하시겠습니까?");
			if (!result) return;
			mutate();
		};

		const checkResult = checkCanBuyStock();
		checkResult ? confirmBuyStockAlert() : alert("포인트가 부족합니다.");
	};

	return (
		<form
			onSubmit={handleBuyStock}
			className="flex grow flex-col justify-between"
		>
			<div className="mt-4 flex h-[7.5rem] w-[14.875rem] flex-col items-center rounded border border-stock-buy bg-white">
				<div className="mt-[0.875rem] flex h-10 w-[13.125rem] items-center">
					<p className="text-center text-sm font-normal text-black-800">
						주식 개수
					</p>
					<button
						type="button"
						onClick={decreaseStockCount}
						className="ml-5 flex h-10 w-10 items-center justify-center border border-black-100"
					>
						<Minus />
					</button>
					<p className="flex h-10 w-[3.375rem] items-center justify-center border border-b-black-100 border-t-black-100">
						{stockCount}주
					</p>
					<button
						type="button"
						onClick={increaseStockCount}
						className="flex h-10 w-10 items-center justify-center border border-black-100"
					>
						<Plus />
					</button>
				</div>
				<div className="mt-3 flex h-10 w-[13.125rem] items-center">
					<p className="text-center text-sm font-normal text-black-800">금액</p>
					<div className="ml-12 flex h-10 w-32 grow items-center justify-end border-b border-b-black-100">
						<input
							type="text"
							className="mr-2 w-24 text-right text-base font-bold outline-none"
							readOnly
							value={stockPriceInfo.purchasePrice * stockCount}
						/>
						<PointLogo />
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<div className=" flex w-[14.875rem] flex-row items-center ">
					<p className="ml-[0.875rem] text-center text-sm font-normal text-black-800">
						금액
					</p>
					<div className="ml-12 flex h-10 w-[8.25rem] grow flex-row items-center justify-end border-b border-b-black-100">
						<p className="mr-2 text-base font-bold">
							{stockPriceInfo.purchasePrice * stockCount}
						</p>
						<PointLogo />
					</div>
				</div>
				<button
					type="submit"
					className="my-6 flex h-12 w-[14.875rem] flex-row items-center justify-center rounded border border-black-100 bg-stock-buy text-white "
				>
					<p>매수하기</p>
				</button>
			</div>
		</form>
	);
};

export default BuyStockForm;

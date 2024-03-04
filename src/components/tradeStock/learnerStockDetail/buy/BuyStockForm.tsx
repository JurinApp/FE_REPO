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
			className="flex w-full grow flex-col justify-between sm:w-[14.875rem]"
		>
			<div className="mt-4 flex h-[7.5rem] w-full flex-col items-center rounded border border-stock-buy bg-white px-2 sm:w-[14.875rem] sm:px-0">
				<div className="mt-[0.875rem] flex h-10 w-full items-center justify-between sm:w-[13.125rem]">
					<p className="text-left text-sm font-normal text-black-800">
						주식 개수
					</p>
					<div className="flex sm:w-[8.375rem]">
						<button
							type="button"
							onClick={decreaseStockCount}
							className="flex h-8 w-8 items-center justify-center border border-black-100 sm:h-10 sm:w-10"
						>
							<Minus />
						</button>
						<p className="flex h-8 w-8 items-center justify-center border border-b-black-100 border-t-black-100 sm:h-10 sm:w-[3.375rem]">
							{stockCount}주
						</p>
						<button
							type="button"
							onClick={increaseStockCount}
							className="flex h-8 w-8 items-center justify-center border border-black-100 sm:h-10 sm:w-10"
						>
							<Plus />
						</button>
					</div>
				</div>
				<div className="mt-3 flex h-10 w-full items-center justify-between sm:w-[13.125rem]">
					<p className="w-8 text-left text-sm font-normal text-black-800">
						금액
					</p>
					<div className="flex h-10 w-full items-center border-b border-black-100 sm:w-[8.375rem]">
						<input
							type="text"
							className="mr-2 w-24 grow text-right text-base font-bold outline-none"
							readOnly
							value={stockPriceInfo.purchasePrice * stockCount}
						/>
						<PointLogo />
					</div>
				</div>
			</div>
			<div className="flex w-full flex-col">
				<div className=" flex w-full flex-row items-center sm:w-[14.875rem] ">
					<p className="ml-[0.875rem] text-center text-sm font-normal text-black-800">
						금액
					</p>
					<div className="ml-12 flex h-10 w-full grow flex-row items-center justify-end border-b border-b-black-100 sm:w-[8.25rem]">
						<p className="mr-2 text-base font-bold">
							{stockPriceInfo.purchasePrice * stockCount}
						</p>
						<PointLogo />
					</div>
				</div>
				<button
					type="submit"
					className="my-6 flex h-12 w-full flex-row items-center justify-center rounded border border-black-100 bg-stock-buy text-white sm:w-[14.875rem] "
				>
					매수하기
				</button>
			</div>
		</form>
	);
};

export default BuyStockForm;

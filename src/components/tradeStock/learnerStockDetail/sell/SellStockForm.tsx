import useSellStock from "@/hooks/mutations/studentTradeDetail/useSellStock";
import { IStockPriceInfo, IUserPointInfo } from "@/interface/stock";
import Minus from "@assets/svg/minus.svg?react";
import Plus from "@assets/svg/plus.svg?react";
import PointLogo from "@assets/svg/point.svg?react";
import { FormEvent, useMemo, useState } from "react";

interface ISellInterfaceProps {
	readonly userPointInfo: IUserPointInfo;
	readonly stockPriceInfo: IStockPriceInfo;
}

const date = new Date();
const hours = date.getHours();

const SellStockForm = ({
	stockPriceInfo,
	userPointInfo,
}: ISellInterfaceProps) => {
	const [stockCount, setStockCount] = useState<number>(1);
	const { mutate } = useSellStock(stockCount);

	const sellTax = useMemo(() => {
		return (stockPriceInfo.purchasePrice * stockPriceInfo.tax) / 100;
	}, [stockPriceInfo.purchasePrice, stockPriceInfo.tax]);

	const increaseStockCount = () => {
		if (stockCount >= userPointInfo.totalStockAmount) return;
		setStockCount(stockCount + 1);
	};

	const decreaseStockCount = () => {
		if (stockCount <= 1) return;
		setStockCount(stockCount - 1);
	};

	const checkSellTime = () => {
		if (hours < 9 || hours >= 15) {
			alert("매도는 09:00 ~ 15:00 사이에 가능합니다");
			return false;
		}

		return true;
	};

	const handleSellStock = (e: FormEvent) => {
		e.preventDefault();

		if (!checkSellTime()) return;

		if (userPointInfo.totalStockAmount === 0) {
			alert("보유중인 주식이 없습니다.");
			return;
		}

		const result = confirm(
			`${stockPriceInfo.name} 주식 ${stockCount}개를 매도를 하시겠습니까`,
		);

		if (!result) return;

		mutate();
	};

	return (
		<form
			onSubmit={handleSellStock}
			className="flex w-full grow flex-col justify-between sm:w-[14.875rem]"
		>
			<div className="mt-4 flex h-[10.75rem] w-full flex-col items-center rounded border border-stock-sell bg-white px-2 sm:w-[14.875rem] sm:px-0">
				<div className="mt-[0.875rem] flex h-10 w-full items-center justify-between sm:w-[13.125rem]">
					<p className="text-left text-sm font-normal text-black-800">
						주식 개수
					</p>
					<div className="flex w-full sm:w-[8.375rem]">
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
							defaultValue={stockPriceInfo.purchasePrice * stockCount}
						/>
						<PointLogo />
					</div>
				</div>
				<div className="mt-3 flex h-10 w-[13.125rem] items-center">
					<p className="text-center text-sm font-normal text-black-800">세금</p>
					<div className="ml-12 flex h-10 w-32 grow flex-row items-center border-b border-b-black-100">
						<p className="w-full text-right text-base font-bold">
							{stockPriceInfo.tax}
							<span className="ml-3 mr-1">%</span>
						</p>
					</div>
				</div>
			</div>
			<div className="my-6 flex w-full flex-col">
				<div className="flex w-full flex-row items-center sm:w-[14.875rem]">
					<p className="ml-[0.875rem] text-center text-sm font-normal text-black-800">
						금액
					</p>
					<div className="ml-12 flex h-10 w-full grow flex-row items-center justify-end border-b border-b-black-100 sm:w-[8.25rem]">
						<p className="mr-2 text-base font-bold">
							{Math.floor(
								(stockPriceInfo.purchasePrice - sellTax) * stockCount,
							)}
						</p>
						<PointLogo />
					</div>
				</div>
				<button
					type="submit"
					className="mt-6 flex h-12 w-full flex-row items-center justify-center rounded border border-black-100 bg-stock-sell text-white sm:w-[14.875rem]"
				>
					<p>매도하기</p>
				</button>
			</div>
		</form>
	);
};

export default SellStockForm;

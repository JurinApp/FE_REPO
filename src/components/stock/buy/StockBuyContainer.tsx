import { IStockBSHistory } from "@/interface/stock";
import PointLogo from "@assets/svg/point.svg?react";
import Plus from "@assets/svg/plus.svg?react";
import Minus from "@assets/svg/minus.svg?react";
import { useState } from "react";

const StockBuyContainer = ({
	stockBuyProps,
	stockPrice,
}: {
	stockBuyProps: IStockBSHistory;
	stockPrice: number;
}) => {
	const [stockCount, setStockCount] = useState(1);

	const increaseStockCount = () => {
		setStockCount(stockCount + 1);
	};

	const decreaseStockCount = () => {
		if (stockCount > 0) {
			setStockCount(stockCount - 1);
		}
	};

	const buyStock = () => {
		// TODO: 주식 구매 API
	};

	return (
		<>
			<div className="relative mx-auto h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<div className="flex flex-row">
					<div
						id="price-history"
						className="flex h-inTrade-height w-[7.688rem] flex-col"
					>
						<div id="buy" className=" flex flex-grow flex-col">
							{stockBuyProps.buy.map((transaction, index) => (
								<div
									key={index}
									className={`flex flex-grow items-center justify-between bg-stock-blue px-2 ${
										index !== 0 ? "border-t border-black-300" : ""
									}`}
								>
									<span>{transaction.price}</span>
									<span>{transaction.quantity}</span>
								</div>
							))}
						</div>
						<div id="sell" className=" flex flex-grow flex-col">
							{stockBuyProps.sell.map((transaction, index) => (
								<div
									key={index}
									className="flex flex-grow items-center justify-between border-t border-black-300 bg-stock-red px-2"
								>
									<span>{transaction.price}</span>
									<span>{transaction.quantity}</span>
								</div>
							))}
						</div>
					</div>
					<div
						id="buy-interface"
						className="mx-4 flex h-inTrade-height w-[14.875rem] flex-col items-center justify-between pt-6"
					>
						<div className="flex flex-col">
							<div
								id="my-point"
								className="flex h-12 w-[14.875rem] flex-row items-center rounded border border-black-100 bg-white"
							>
								<p className="ml-[0.875rem] text-sm font-normal">내 포인트</p>
								<p className="ml-[6.438rem] mr-[0.313rem] text-base font-bold">
									500
								</p>
								<PointLogo />
							</div>
							<div
								id="my-stock"
								className="mt-1 flex h-12 w-[14.875rem] flex-row items-center rounded border border-black-100 bg-white"
							>
								<p className="ml-[0.875rem] text-sm font-normal">
									보유중인 주식
								</p>
								<p className="ml-[6.063rem] mr-[0.625rem] text-base font-bold">
									4
								</p>
								<p className="text-base font-bold">주</p>
							</div>
							<div
								id="buy-div"
								className="border-stock-buy mt-4 flex h-[7.5rem] w-[14.875rem] flex-col rounded border bg-white"
							>
								<div
									id="count-stock"
									className="ml-[0.875rem] mt-[14px] flex h-10 w-[210px] flex-row items-center"
								>
									<p className="text-center text-sm font-normal">주식 개수</p>
									<button
										onClick={decreaseStockCount}
										className="ml-5 flex h-10 w-10 items-center justify-center border border-black-300"
									>
										<Minus />
									</button>
									<p className="flex h-10 w-[54px] items-center justify-center border border-b-black-300 border-t-black-300">
										{stockCount} 주
									</p>
									<button
										onClick={increaseStockCount}
										className="flex h-10 w-10 items-center justify-center border border-black-300"
									>
										<Plus />
									</button>
								</div>
								<div
									id="price"
									className="mx-[0.875rem] mt-3 flex h-10 w-[210px] flex-row items-center"
								>
									<p className="text-center text-sm font-normal">금액</p>
									<div className="ml-12 flex h-10 w-[132px] flex-row items-center justify-end border-b border-b-black-300">
										<p className="text-base font-bold">
											{stockPrice * stockCount}
										</p>
										<p className="ml-[10px] text-base font-bold">원</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col">
							<div
								id="my-stock"
								className=" flex w-[14.875rem] flex-row items-center "
							>
								<p className="ml-[14px] text-center text-sm font-normal">
									금액
								</p>
								<div className="ml-12 flex h-10 w-[132px] flex-row items-center justify-end border-b border-b-black-300">
									<p className="text-base font-bold">
										{stockPrice * stockCount}
									</p>
									<p className="ml-[10px] text-base font-bold">원</p>
								</div>
							</div>
							<button className="bg-stock-buy my-6 flex h-12 w-[14.875rem] flex-row items-center justify-center rounded border border-black-100 text-white ">
								<p>매수하기</p>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default StockBuyContainer;

import PointLogo from "@assets/svg/point.svg?react";
import Plus from "@assets/svg/plus.svg?react";
import Minus from "@assets/svg/minus.svg?react";
import { useState } from "react";
import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ISellInterfaceProps {
	readonly stockPrice: number;
	readonly userPoint: number;
	readonly stockAmount: number;
	readonly tax: number;
}
const StockSellInterface = ({
	stockPrice,
	userPoint,
	stockAmount,
	tax,
}: ISellInterfaceProps) => {
	const [stockCount, setStockCount] = useState(1);
	const { axiosData } = useAxios();
	const queryClient = useQueryClient();

	const increaseStockCount = () => {
		if (stockCount < stockAmount) setStockCount(stockCount + 1);
	};
	const channelId = location.pathname.split("/")[1];
	const stockId = location.pathname.split("/")[3];

	const sellTax = (stockPrice * tax) / 100;

	const decreaseStockCount = () => {
		if (stockCount > 0) {
			setStockCount(stockCount - 1);
		}
	};
	console.log(stockPrice);

	const sellStock = async () => {
		const apiUrl = `/students/api/v1/channels/${channelId}/stocks/${stockId}`;
		const response = await axiosData("useToken", {
			method: "POST",
			url: apiUrl,
			data: {
				tradeType: 2,
				amount: stockCount,
			},
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				return response.data.data;
			}
		}
	};

	const { mutate } = useMutation({
		mutationFn: sellStock,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["stockSpec"] });
			queryClient.invalidateQueries({ queryKey: ["userStock"] });
		},
	});

	const handleSellStock = () => {
		mutate();
		alert("매수가 완료되었습니다.");
	};

	return (
		<>
			<div
				id="sell-interface"
				className="mx-4 flex h-inTrade-height w-[14.875rem] flex-col items-center justify-between pt-6"
			>
				<div className="flex flex-col">
					<div
						id="my-point"
						className="flex h-12 w-[14.875rem] flex-row items-center rounded border border-black-100 bg-white"
					>
						<p className="ml-[0.875rem] text-sm font-normal">내 포인트</p>
						<p className="ml-[6.438rem] mr-[0.313rem] text-base font-bold">
							{userPoint}
						</p>
						<PointLogo />
					</div>
					<div
						id="my-stock"
						className="mt-1 flex h-12 w-[14.875rem] flex-row items-center rounded border border-black-100 bg-white"
					>
						<p className="ml-[0.875rem] text-sm font-normal">보유중인 주식</p>
						<p className="ml-[6.063rem] mr-[0.625rem] text-base font-bold">
							{stockAmount}
						</p>
						<p className="text-base font-bold">주</p>
					</div>
					<div
						id="sell-div"
						className="mt-4 flex h-[10.75rem] w-[14.875rem] flex-col rounded border border-stock-sell bg-white"
					>
						<div
							id="count-stock"
							className="ml-[0.875rem] mt-[0.875rem] flex h-10 w-[13.125rem] flex-row items-center"
						>
							<p className="text-center text-sm font-normal">주식 개수</p>
							<button
								onClick={decreaseStockCount}
								className="ml-5 flex h-10 w-10 items-center justify-center border border-black-300"
							>
								<Minus />
							</button>
							<p className="flex h-10 w-[3.375rem] items-center justify-center border border-b-black-300 border-t-black-300">
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
							className="mx-[0.875rem] mt-3 flex h-10 w-[13.125rem] flex-row items-center"
						>
							<p className="text-center text-sm font-normal">금액</p>
							<div className="ml-12 flex h-10 w-[8.25rem] flex-row items-center justify-end border-b border-b-black-300">
								<p className="text-base font-bold">{stockPrice * stockCount}</p>
								<p className="ml-[0.625rem] text-base font-bold">원</p>
							</div>
						</div>
						<div
							id="tax"
							className="mx-[0.875rem] mt-3 flex h-10 w-[13.125rem] flex-row items-center"
						>
							<p className="text-center text-sm font-normal">세금</p>
							<div className="ml-12 flex h-10 w-[8.25rem] flex-row items-center border-b border-b-black-300">
								<p className="ml-[5.188rem] mr-[0.625rem] text-base font-bold">
									{tax}
								</p>
								<p className="text-base font-bold">%</p>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col">
					<div
						id="my-stock"
						className=" flex w-[14.875rem] flex-row items-center "
					>
						<p className="ml-[0.875rem] text-center text-sm font-normal">
							금액
						</p>
						<div className="ml-12 flex h-10 w-[8.25rem] flex-row items-center justify-end border-b border-b-black-300">
							<p className="mr-1 text-base font-bold">
								{Math.floor((stockPrice - sellTax) * stockCount)}
							</p>
							<PointLogo />
						</div>
					</div>
					<button
						onClick={handleSellStock}
						className="my-6 flex h-12 w-[14.875rem] flex-row items-center justify-center rounded border border-black-100 bg-stock-sell text-white "
					>
						<p>매도하기</p>
					</button>
				</div>
			</div>
		</>
	);
};

export default StockSellInterface;

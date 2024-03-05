import { IStockInfo } from "@/interface/stock";
import { useMemo } from "react";

interface IStockInfoProps {
	readonly stockInfo: IStockInfo;
}

const StockInfo = ({ stockInfo }: IStockInfoProps) => {
	const STOCK_INFO_LABELS = useMemo(() => {
		return [
			{
				label: "가격",
				value: stockInfo.purchasePrice,
			},
			{
				label: "세금",
				value: stockInfo.tax,
			},
			{
				label: "기준",
				value: stockInfo.standard,
			},
			{
				label: "내용",
				value: stockInfo.content,
			},
		];
	}, []);

	return (
		<section className="mx-4 flex flex-col">
			<div className="rounded border border-black-100 bg-white">
				<div className="mx-6 my-6 h-10 border-b ">
					<p className="font-bold">{stockInfo.name}</p>
				</div>
				<div className="mx-6 mb-6">
					<ul>
						{STOCK_INFO_LABELS.map(
							(info: { label: string; value: number | string }) => (
								<li key={info.label} className="mt-[0.375rem] flex flex-row">
									<p className="font-normal text-black-800">{info.label}</p>
									<p className="ml-[0.625rem] font-medium">{info.value}</p>
								</li>
							),
						)}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default StockInfo;

import { IStockSpecData } from "@/interface/stock";
import { IStockInfo } from "./StockSpecContainer";

const StockSpecSection = ({
	name,
	tax,
	standard,
	purchasePrice,
	content,
}: IStockInfo) => {
	return (
		<>
			<section id="stock-spec" className="mx-4 flex flex-col">
				<div className="mt-6 bg-white">
					<div id="stock-name" className="mx-6 mt-6">
						<p className="mb-6 border-b font-bold">{name}</p>
					</div>
					<div id="stock-detail" className="mx-6 mb-6">
						<ul>
							<li className="flex flex-row">
								<p className="font-normal">가격</p>
								<p className="ml-[0.625rem] font-medium">{purchasePrice}</p>
							</li>
							<li className="flex flex-row">
								<p className="font-normal">세금</p>
								<p className="ml-[0.625rem] font-medium">{tax}</p>
							</li>
							<li className="flex flex-row">
								<p className="font-normal">기준</p>
								<p className="ml-[0.625rem] font-medium">{standard}</p>
							</li>
							<li className="flex flex-row">
								<p className="font-normal">내용</p>
								<p className="ml-[0.625rem] font-medium">{content}</p>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</>
	);
};

export default StockSpecSection;

interface StockSpecProps {
	readonly stockInfo: {
		readonly name: string;
		readonly price: number;
		readonly tax: string;
		readonly basis: string;
		readonly detail: string;
	};
}

const StockSpecSection = ({ stockInfo }: StockSpecProps) => {
	return (
		<>
			<section id="stock-spec" className="mx-4 flex flex-col">
				<div className="mt-6 bg-white">
					<div id="stock-name" className="mx-6 mt-6">
						<p className="mb-6 border-b font-bold">{stockInfo.name}</p>
					</div>
					<div id="stock-detail" className="mx-6 mb-6">
						<ul>
							<li className="flex flex-row">
								<p className="font-normal">가격</p>
								<p className="ml-[0.625rem] font-medium">{stockInfo.price}</p>
							</li>
							<li className="flex flex-row">
								<p className="font-normal">세금</p>
								<p className="ml-[0.625rem] font-medium">{stockInfo.tax}</p>
							</li>
							<li className="flex flex-row">
								<p className="font-normal">기준</p>
								<p className="ml-[0.625rem] font-medium">{stockInfo.basis}</p>
							</li>
							<li className="flex flex-row">
								<p className="font-normal">내용</p>
								<p className="ml-[0.625rem] font-medium">{stockInfo.detail}</p>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</>
	);
};

export default StockSpecSection;

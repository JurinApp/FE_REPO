const StockSpecContainer = () => {
	return (
		<>
			<div className="mx-auto flex h-[43.438rem] flex-col sm:w-[23.563rem]">
				<section id="stock-spec" className="flex flex-col">
					<div id="stock-name"></div>
					<div id="stock-detail">
						<ul>
							<li className="flex flex-row">
								<p>가격</p>
								<p>100</p>
							</li>
							<li className="flex flex-row">
								<p>세금</p>
								<p>0.3%</p>
							</li>
							<li className="flex flex-row">
								<p>기준</p>
								<p>가나다라마바사</p>
							</li>
							<li className="flex flex-row">
								<p>내용</p>
								<p>가나다라마바사</p>
							</li>
						</ul>
					</div>
				</section>
				<section id="stock-chart">차트가 들어갈 공간</section>
			</div>
		</>
	);
};

export default StockSpecContainer;

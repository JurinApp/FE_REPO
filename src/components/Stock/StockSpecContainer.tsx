import StockSpecSection from "./StockSpecSection";

export interface IStockSpec {
	readonly name: string;
	readonly price: number;
	readonly tax: string;
	readonly basis: string;
	readonly detail: string;
}
const StockSpecContainer = () => {
	const teacher_weight: IStockSpec = {
		name: "선생님의 몸무게",
		price: 700,
		tax: "0.3%",
		basis: "가나다",
		detail: "라마바사",
	};
	return (
		<>
			<div className="h-inTrade-height relative mx-auto w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
				<StockSpecSection stockSpec={teacher_weight} />
				<section id="stock-chart" className="mx-6 mt-6">
					<div>차트 라이브러리</div>
				</section>
			</div>
		</>
	);
};

export default StockSpecContainer;

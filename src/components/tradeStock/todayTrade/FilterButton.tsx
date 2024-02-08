import { TodayTradeFilterState } from "@/states/TodayTradeFilterState";
import { useRecoilState } from "recoil";

const FilterButton = () => {
	const [filterState, setFilterState] = useRecoilState(TodayTradeFilterState);

	const handleClickFilter = (filterType: string) => {
		setFilterState(filterType);
	};

	return (
		<div className="grid grid-cols-3 pt-6 text-center text-sm">
			<button
				type="button"
				onClick={() => handleClickFilter("all")}
				className={`mr-[0.313rem] h-[1.875rem] rounded-full  ${
					filterState === "all"
						? "bg-black-800 font-bold text-white"
						: "h-[1.875rem] border border-black-800 bg-white font-medium text-black-800"
				}`}
			>
				전체
			</button>
			<button
				type="button"
				onClick={() => handleClickFilter("buy")}
				className={`mr-[0.313rem]  h-[1.875rem] rounded-full ${
					filterState === "buy"
						? "bg-stock-buy font-bold text-white"
						: "border border-stock-buy bg-white font-medium text-stock-buy"
				}`}
			>
				매수
			</button>
			<button
				type="button"
				onClick={() => handleClickFilter("sell")}
				className={`h-[1.875rem] rounded-full ${
					filterState === "sell"
						? "bg-stock-sell font-bold text-white"
						: "border border-stock-sell bg-white font-medium text-stock-sell"
				}`}
			>
				매도
			</button>
		</div>
	);
};

export default FilterButton;

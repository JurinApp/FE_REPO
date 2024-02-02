import { myItemFilterState } from "@/states/myItemFilterState";
import { useRecoilState } from "recoil";

const ItemFilterButton = () => {
	const [filterState, setFilterState] = useRecoilState(myItemFilterState);

	const clickFilterHandler = (filterType: string) => {
		setFilterState(filterType);
	};

	return (
		<div className="grid grid-cols-3 px-6 pt-6 text-center text-sm">
			<button
				type="button"
				onClick={() => clickFilterHandler("all")}
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
				onClick={() => clickFilterHandler("available")}
				className={`mr-[0.313rem]  h-[1.875rem] rounded-full ${
					filterState === "available"
						? "bg-black-800 font-bold text-white"
						: "h-[1.875rem] border border-black-800 bg-white font-medium text-black-800"
				}`}
			>
				사용 가능
			</button>
			<button
				type="button"
				onClick={() => clickFilterHandler("used")}
				className={`h-[1.875rem] rounded-full ${
					filterState === "used"
						? "bg-black-800 font-bold text-white"
						: "h-[1.875rem] border border-black-800 bg-white font-medium text-black-800"
				}`}
			>
				사용 완료
			</button>
		</div>
	);
};

export default ItemFilterButton;

import { myItemFilterState } from "@/states/filterState/myItemFilterState";
import { useRecoilState } from "recoil";

const MyItemFilter = () => {
	const [filterState, setFilterState] = useRecoilState(myItemFilterState);

	const clickFilterHandler = (filterType: string) => {
		setFilterState(filterType);
	};

	return (
		<div className="px-6 pt-6 text-center text-sm">
			<ul className="grid grid-cols-3">
				<li className="w-full px-1">
					<button
						type="button"
						onClick={() => clickFilterHandler("all")}
						className={`h-[1.875rem] w-full rounded-full ${
							filterState === "all"
								? "bg-black-800 font-bold text-white"
								: "border border-black-800 bg-white font-medium text-black-800"
						}`}
					>
						전체
					</button>
				</li>
				<li className="w-full px-1">
					<button
						type="button"
						onClick={() => clickFilterHandler("available")}
						className={`h-[1.875rem] w-full rounded-full ${
							filterState === "available"
								? "bg-black-800 font-bold text-white"
								: "border border-black-800 bg-white font-medium text-black-800"
						}`}
					>
						사용 가능
					</button>
				</li>
				<li className="w-full px-1">
					<button
						type="button"
						onClick={() => clickFilterHandler("used")}
						className={`h-[1.875rem] w-full rounded-full ${
							filterState === "used"
								? "bg-black-800 font-bold text-white"
								: "border border-black-800 bg-white font-medium text-black-800"
						}`}
					>
						사용 완료
					</button>
				</li>
			</ul>
		</div>
	);
};

export default MyItemFilter;

import { ITabs } from "@/pages/student/stock/LearnerStockDetailPage";
import { selectedStockTabState } from "@/states/selectedTabState/selectedStockTabState";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const TABS = [
	{ key: "spec", name: "설명" },
	{ key: "buy", name: "매수" },
	{ key: "sell", name: "매도" },
	{ key: "order", name: "주문체결" },
];

const StockTab = () => {
	const [selectedTab, setSelectedTab] = useRecoilState(selectedStockTabState);

	const clickTabHandler = (tab: ITabs) => {
		setSelectedTab(tab.key);
	};

	useEffect(() => {
		return () => {
			setSelectedTab("spec");
		};
	}, []);

	return (
		<>
			<div className="mx-auto grid w-full grid-cols-4 bg-white sm:w-[24.536rem]">
				{TABS.map((tab) => (
					<div
						key={tab.key}
						className={`flex h-[3.563rem] cursor-pointer items-center justify-center text-lg ${
							selectedTab === tab.key
								? "border-b-2 border-black-800 font-bold"
								: "text-black-700"
						}`}
						onClick={() => clickTabHandler(tab)}
					>
						{tab.name}
					</div>
				))}
			</div>
		</>
	);
};

export default StockTab;

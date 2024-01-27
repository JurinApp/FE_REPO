import { selectedTabState } from "@/states/selectedTabState";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

interface ITabs {
	readonly key: string;
	readonly name: string;
	readonly path: string;
}

const TABS = [
	{ key: "stockSpec", name: "설명", path: "/stock/spec" },
	{ key: "stockBuy", name: "매수", path: "/stock/buy" },
	{ key: "stockSell", name: "매도", path: "/stock/sell" },
	{ key: "stockOrder", name: "주문체결", path: "/stock/order" },
];

const StockTab = () => {
	const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState);
	const navigate = useNavigate();
	const location = useLocation();

	const clickTabHandler = (tab: ITabs) => {
		setSelectedTab(tab.key);
		navigate(tab.path);
	};

	useEffect(() => {
		const path = location.pathname;

		if (path === "/stock/home") {
			setSelectedTab("stockSpec");
		}
		if (path === "/stock/buy") {
			setSelectedTab("stockBuy");
		}
		if (path === "/stock/sell") {
			setSelectedTab("stockSell");
		}
		if (path === "/stock/order") {
			setSelectedTab("stockOrder");
		}
	}, [location]);

	useEffect(() => {
		return () => {
			setSelectedTab(TABS[0].key);
		};
	}, []);

	return (
		<div className="mx-auto grid w-full grid-cols-4 bg-white sm:w-[24.536rem]">
			{TABS.map((tab) => (
				<div
					key={tab.key}
					className={`flex h-[3.563rem] items-center justify-center text-lg ${
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
	);
};

export default StockTab;

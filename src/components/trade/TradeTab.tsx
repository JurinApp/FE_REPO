import { selectedTabState } from "@/states/selectedTabState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

interface ITabs {
	readonly key: string;
	readonly name: string;
	readonly path: string;
}

const TABS = [
	{ key: "tradeHome", name: "홈", path: "/trade/home" },
	{ key: "tradeTodayTrade", name: "오늘의 거래", path: "/trade/todayTrade" },
	{ key: "tradeMyStock", name: "나의 주식", path: "/trade/myStock" },
];

const TradeTab = () => {
	const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState);
	const navigate = useNavigate();

	const clickTabHandler = (tab: ITabs) => {
		setSelectedTab(tab.key);
		navigate(tab.path);
	};

	useEffect(() => {
		return () => {
			setSelectedTab(TABS[0].key);
		};
	}, []);

	return (
		<div className="grid w-full grid-cols-3 bg-white">
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

export default TradeTab;

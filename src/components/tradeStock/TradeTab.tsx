import { selectedTabState } from "@/states/selectedTabState/selectedTabState";
import { userRoleState } from "@/states/userRoleState";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

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
	const resetSelectedTab = useResetRecoilState(selectedTabState);
	const userRole = useRecoilValue(userRoleState);
	const navigate = useNavigate();
	const location = useLocation();

	const allowedTabs = TABS.filter((tab) => {
		if (userRole === "teacher") {
			return TABS.indexOf(tab) <= 1;
		}
		return true;
	});

	const handleClickTab = (tab: ITabs) => {
		const channelId = location.pathname.substring(1, 2);
		setSelectedTab(tab.key);
		navigate(`/${channelId}${tab.path}`);
	};

	useEffect(() => {
		const path = location.pathname;

		if (path === "/trade/home") {
			setSelectedTab("tradeHome");
		}
		if (path === "/trade/todayTrade") {
			setSelectedTab("tradeTodayTrade");
		}
		if (path === "/trade/myStock") {
			setSelectedTab("tradeMyStock");
		}
	}, [location]);

	useEffect(() => {
		return () => {
			resetSelectedTab();
		};
	}, []);

	return (
		<div
			className={`mx-auto grid w-full ${
				allowedTabs.length === 2 ? "grid-cols-2" : "grid-cols-3"
			} bg-white sm:w-[24.536rem]`}
		>
			{allowedTabs.map((tab) => (
				<div
					key={tab.key}
					className={`flex h-[3.563rem] cursor-pointer items-center justify-center text-lg ${
						selectedTab === tab.key
							? "border-b-2 border-black-800 font-bold"
							: "text-black-700"
					}`}
					onClick={() => handleClickTab(tab)}
				>
					{tab.name}
				</div>
			))}
		</div>
	);
};

export default TradeTab;

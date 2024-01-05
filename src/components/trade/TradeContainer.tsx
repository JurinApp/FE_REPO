import { selectedTabState } from "@/states/selectedTabState";
import { useRecoilValue } from "recoil";
import TradeTab from "./TradeTab";
import { lazy } from "react";

const TradeHomeContainer = lazy(
	() => import("@components/trade/tradeHome/TradeHomeContainer"),
);

const TradeContainer = () => {
	const selectedTab = useRecoilValue(selectedTabState);
	return (
		<div className="h-inTrade-height w-full bg-btn-cancel-tekhelet sm:w-[24.536rem]">
			<TradeTab />
			{selectedTab === "tradeHome" && <TradeHomeContainer />}
			{/* {selectedTab === "tradeTodayTrade" && }
      {selectedTab === "tradeMyStock" && }  */}
		</div>
	);
};

export default TradeContainer;

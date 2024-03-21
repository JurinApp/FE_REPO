import TodayTradeContainer from "@components/tradeStock/todayTrade/TodayTradeContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const TodayTradePage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);

	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: true,
			isUseMenu: true,
			isUseTab: true,
			isUseItemTab: false,
		});
	}, []);

	return (
		<>
			<TodayTradeContainer />
		</>
	);
};

export default TodayTradePage;

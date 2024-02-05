import TodayTradeContainer from "@/components/educator/trade/todayTrade/TodayTradeContainer";
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
		});
	}, []);

	return (
		<>
			<TodayTradeContainer />
		</>
	);
};

export default TodayTradePage;

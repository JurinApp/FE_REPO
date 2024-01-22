import TradeHomeContainer from "@/components/educator/trade/tradeHome/inquiryTradeStocks/TradeHomeContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const TradePage = () => {
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
			<TradeHomeContainer />
		</>
	);
};

export default TradePage;

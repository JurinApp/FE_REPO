import DetailTradeStockContainer from "@components/tradeStock/tradeHome/educator/educatorDetailTradeStock/DetailTradeStockContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useSetRecoilState } from "recoil";
import { useLayoutEffect } from "react";

const DetailTradeStockPage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);

	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: false,
			isUseMenu: true,
			isUseTab: false,
		});
	}, []);

	return (
		<>
			<DetailTradeStockContainer />
		</>
	);
};

export default DetailTradeStockPage;

import { headerMenuUseState } from "@/states/headerMenuUseState";
import RegisterTradeStockContainer from "@components/trade/tradeHome/registerTradeStocks/RegisterTradeStockContainer";
import { useSetRecoilState } from "recoil";
import { useLayoutEffect } from "react";

const RegisterTradeStockPage = () => {
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
			<RegisterTradeStockContainer />
		</>
	);
};

export default RegisterTradeStockPage;

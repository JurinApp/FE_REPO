import StockBuyContainer from "@/components/stock/buy/StockBuyContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const StockBuyPage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);

	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: true,
			isUseMenu: true,
			isUseTab: true,
		});
	}, []);
	return (
		<div>
			<StockBuyContainer />
		</div>
	);
};

export default StockBuyPage;

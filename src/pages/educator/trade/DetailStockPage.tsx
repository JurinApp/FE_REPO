import DetailStockContainer from "@/components/tradeStock/educatorDetailStock/DetailStockContainer";
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
			<DetailStockContainer />
		</>
	);
};

export default DetailTradeStockPage;

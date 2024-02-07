import { headerMenuUseState } from "@/states/headerMenuUseState";
import EditTradeStockContainer from "@components/tradeStock/tradeHome/educator/educatorEditTradeStock/EditTradeStockContainer";
import { useSetRecoilState } from "recoil";
import { useLayoutEffect } from "react";

const EditTradeStockPage = () => {
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
			<EditTradeStockContainer />
		</>
	);
};

export default EditTradeStockPage;

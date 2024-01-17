import StockSpecContainer from "@/components/stock/detail/StockSpecContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const StockSpecPage = () => {
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
			<StockSpecContainer />
		</div>
	);
};

export default StockSpecPage;

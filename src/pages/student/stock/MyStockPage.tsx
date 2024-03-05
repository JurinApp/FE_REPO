import MyStockContainer from "@/components/tradeStock/myStock/MyStockContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const MyStockPage = () => {
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
			<MyStockContainer />
		</>
	);
};

export default MyStockPage;

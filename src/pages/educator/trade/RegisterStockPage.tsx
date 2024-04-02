import { headerMenuUseState } from "@/states/headerMenuUseState";
import RegisterStockContainer from "@/components/tradeStock/registerStock/RegisterStockContainer";
import { useSetRecoilState } from "recoil";
import { useLayoutEffect } from "react";

const RegisterStockPage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);

	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: false,
			isUseMenu: true,
			isUseTab: false,
			isUseItemTab: false,
		});
	}, []);

	return (
		<>
			<RegisterStockContainer />
		</>
	);
};

export default RegisterStockPage;

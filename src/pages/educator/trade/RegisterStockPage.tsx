import { headerMenuUseState } from "@/states/headerMenuUseState";
import RegisterStockContainer from "@/components/tradeStock/tradeHome/educator/educatorRegisterStock/RegisterStockContainer";
import { useSetRecoilState } from "recoil";
import { useLayoutEffect } from "react";

const RegisterStockPage = () => {
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
			<RegisterStockContainer />
		</>
	);
};

export default RegisterStockPage;

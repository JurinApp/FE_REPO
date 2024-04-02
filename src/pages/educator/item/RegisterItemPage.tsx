import RegisterItemContainer from "@/components/educator/item/registerItem/RegisterItemContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const RegisterItemPage = () => {
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
			<RegisterItemContainer />
		</>
	);
};

export default RegisterItemPage;

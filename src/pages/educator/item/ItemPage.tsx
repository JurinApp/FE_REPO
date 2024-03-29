import ItemContainer from "@/components/educator/item/inquiryItem/ItemContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const ItemPage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);

	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: true,
			isUseMenu: true,
			isUseTab: false,
			isUseItemTab: false,
		});
	}, []);

	return (
		<>
			<ItemContainer />
		</>
	);
};

export default ItemPage;

import DetailItemContainer from "@/components/educator/item/detailItem/DetailItemContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const DetailItemPage = () => {
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
			<DetailItemContainer />
		</>
	);
};

export default DetailItemPage;

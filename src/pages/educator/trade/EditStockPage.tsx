import { headerMenuUseState } from "@/states/headerMenuUseState";
import EditStockContainer from "@/components/tradeStock/editStock/EditStockContainer";
import { useSetRecoilState } from "recoil";
import { useLayoutEffect } from "react";

const EditStockPage = () => {
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
			<EditStockContainer />
		</>
	);
};

export default EditStockPage;

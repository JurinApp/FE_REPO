import { headerMenuUseState } from "@/states/headerMenuUseState";
import EditStockContainer from "@/components/tradeStock/educator/educatorEditStock/EditStockContainer";
import { useSetRecoilState } from "recoil";
import { useLayoutEffect } from "react";

const EditStockPage = () => {
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
			<EditStockContainer />
		</>
	);
};

export default EditStockPage;

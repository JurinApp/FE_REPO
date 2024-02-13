import LearnerStockDetailContainer from "@/components/tradeStock/learnerStockDetail/LearnerStockDetailContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

export interface ITabs {
	readonly key: string;
	readonly name: string;
}

const LearnerStockDetailPage = () => {
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
			<LearnerStockDetailContainer />
		</>
	);
};

export default LearnerStockDetailPage;

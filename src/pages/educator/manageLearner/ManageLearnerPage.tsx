import ManageLearnerContainer from "@/components/manageLearner/ManageLearnerContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const ManageLearnerPage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);

	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: true,
			isUseMenu: true,
			isUseTab: false,
		});
	}, []);

	return (
		<>
			<ManageLearnerContainer />
		</>
	);
};

export default ManageLearnerPage;
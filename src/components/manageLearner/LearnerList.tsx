import { ILearnerInfo } from "@/interface/learnerInfo";
import LearnerInfo from "./LearnerInfo";
import { useEffect } from "react";
import { allCheckState, selectedLearner } from "@/states/manageLearner";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface ILearnerListProps {
	readonly learnerList: ILearnerInfo[];
}

const LearnerList = ({ learnerList }: ILearnerListProps) => {
	const selectedLearners = useRecoilValue(selectedLearner);
	const setIsAllCheck = useSetRecoilState(allCheckState);

	useEffect(() => {
		if (selectedLearners.length === learnerList.length) {
			setIsAllCheck(true);
		} else {
			setIsAllCheck(false);
		}
	}, [selectedLearners]);

	return (
		<div className="mt-6 h-manage-height overflow-y-auto">
			{learnerList.map((learnerInfo: ILearnerInfo) => (
				<LearnerInfo key={learnerInfo.learnerId} learnerInfo={learnerInfo} />
			))}
		</div>
	);
};

export default LearnerList;

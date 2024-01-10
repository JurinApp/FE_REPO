import { ILearnerItem } from "@/interface/learnerItem";
import LearnerItem from "./LearnerItem";
import { useEffect } from "react";
import { allCheckState, selectedLearner } from "@/states/manageLearner";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface ILearnerListProps {
	readonly learnerList: ILearnerItem[];
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
			{learnerList.map((learnerInfo: ILearnerItem) => (
				<LearnerItem key={learnerInfo.learnerId} learnerInfo={learnerInfo} />
			))}
		</div>
	);
};

export default LearnerList;

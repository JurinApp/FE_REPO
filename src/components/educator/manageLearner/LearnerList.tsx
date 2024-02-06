import { ILearnerItem } from "@/interface/learnerItem";
import { allCheckState, selectedLearner } from "@/states/manageLearner";
import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import LearnerItem from "./LearnerItem";

interface ILearnerListProps {
	readonly learnerList: ILearnerItem[];
}

const LearnerList = ({ learnerList }: ILearnerListProps) => {
	const selectedLearners = useRecoilValue(selectedLearner);
	const resetSelectedLearners = useResetRecoilState(selectedLearner);
	const setIsAllCheck = useSetRecoilState(allCheckState);

	useEffect(() => {
		if (selectedLearners.length === learnerList.length) {
			setIsAllCheck(true);
		} else {
			setIsAllCheck(false);
		}
	}, [selectedLearners]);

	useEffect(() => {
		return () => {
			resetSelectedLearners();
		};
	}, []);

	return (
		<div className="mt-6 h-manage-height overflow-y-auto">
			{learnerList.map((learnerInfo: ILearnerItem) => (
				<LearnerItem key={learnerInfo.id} learnerInfo={learnerInfo} />
			))}
		</div>
	);
};

export default LearnerList;

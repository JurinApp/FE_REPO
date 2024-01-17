import { ILearnerItem } from "@/interface/learnerItem";
import { allCheckState, selectedLearner } from "@/states/manageLearner";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import LearnerItem from "./LearnerItem";

interface ILearnerListProps {
	readonly learnerList: ILearnerItem[];
}

const LearnerList = ({ learnerList }: ILearnerListProps) => {
	const [selectedLearners, setSelectedLearners] =
		useRecoilState(selectedLearner);
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
			setSelectedLearners([]);
		};
	}, []);

	return (
		<div className="mt-6 h-manage-height overflow-y-auto">
			{learnerList.map((learnerInfo: ILearnerItem) => (
				<LearnerItem key={learnerInfo.learnerId} learnerInfo={learnerInfo} />
			))}
		</div>
	);
};

export default LearnerList;

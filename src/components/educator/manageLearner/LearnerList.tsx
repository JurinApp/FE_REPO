import { ILearnerItem } from "@/interface/learnerItem";
import {
	allCheckState,
	selectedLearner,
} from "@/states/selectedState/selectedLearnerState";
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
	const isExists = learnerList.length === 0;

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
		<div
			className={`mt-6 h-manage-height overflow-y-auto ${
				isExists && "flex items-center justify-center"
			}`}
		>
			{isExists ? (
				<p className="text-black-700">참여중인 학생이 없습니다.</p>
			) : (
				learnerList.map((learnerInfo: ILearnerItem) => (
					<LearnerItem key={learnerInfo.id} learnerInfo={learnerInfo} />
				))
			)}
		</div>
	);
};

export default LearnerList;

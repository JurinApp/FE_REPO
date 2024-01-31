import { ILearnerItem } from "@/interface/learnerItem";
import { allCheckState, selectedLearner } from "@/states/manageLearner";
import { ChangeEvent, useEffect, useRef } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";

interface IManageLearnerHeadingTitleProps {
	readonly learnerList: ILearnerItem[];
}

const ManageLearnerHeadingTitle = ({
	learnerList,
}: IManageLearnerHeadingTitleProps) => {
	const [isAllCheck, setIsAllCheck] = useRecoilState(allCheckState);
	const setSelectedLearners = useSetRecoilState(selectedLearner);
	const resetIsAllCheck = useResetRecoilState(allCheckState);
	const checkBoxRef = useRef<HTMLInputElement>(null);

	const clickAllCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const isCheck = e.target.checked;

		if (isCheck) {
			const learnerIdArr = learnerList.map((learner) => learner.learnerId);
			setSelectedLearners(learnerIdArr);
			setIsAllCheck(true);
		} else {
			setSelectedLearners([]);
			setIsAllCheck(false);
		}
	};

	useEffect(() => {
		return () => {
			if (isAllCheck) {
				resetIsAllCheck();
			}
		};
	}, []);

	return (
		<div className="flex h-12 w-full items-center justify-between pt-[0.625rem] text-black-800">
			<div className="flex items-center">
				<input
					ref={checkBoxRef}
					type="checkbox"
					id="checkAll"
					className="custom-checkBox cursor-pointer"
					checked={isAllCheck}
					onChange={clickAllCheckHandler}
				/>
				<label
					htmlFor="checkAll"
					className="ml-2 flex h-full cursor-pointer items-center text-sm"
				>
					전체 선택
				</label>
			</div>
			<h1 className="font-bold">
				학생관리 <span>({learnerList.length})</span>
			</h1>
		</div>
	);
};

export default ManageLearnerHeadingTitle;

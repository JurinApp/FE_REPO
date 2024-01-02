import { ILearnerInfo } from "@/interface/learnerInfo";
import { allCheckState, selectedLearner } from "@/states/manageLearner";
import { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

interface IManageLearnerHeadingTitleProps {
	readonly learnerList: ILearnerInfo[];
}

const ManageLearnerHeadingTitle = ({
	learnerList,
}: IManageLearnerHeadingTitleProps) => {
	const setSelectedLearners = useSetRecoilState(selectedLearner);
	const [isAllCheck, setIsAllCheck] = useRecoilState(allCheckState);
	const checkBoxRef = useRef<HTMLInputElement>(null);

	const clickAllCheckHandler = () => {
		if (!isAllCheck) {
			setSelectedLearners(learnerList);
			setIsAllCheck(true);
		} else {
			setSelectedLearners([]);
			setIsAllCheck(false);
		}
	};

	return (
		<div className="flex w-full justify-between text-black-800">
			<div className="flex items-center">
				<input
					ref={checkBoxRef}
					type="checkbox"
					id="checkAll"
					className="h-6 w-6"
					checked={isAllCheck}
					onChange={clickAllCheckHandler}
				/>
				<label
					htmlFor="checkAll"
					className="ml-2 flex h-full items-center text-sm"
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

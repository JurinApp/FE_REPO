import { ILearnerItem } from "@/interface/learnerItem";
import { selectedLearner } from "@/states/manageLearner";
import { useRecoilState } from "recoil";

interface ILearnerInfoProps {
	readonly learnerInfo: ILearnerItem;
}

const LearnerItem = ({ learnerInfo }: ILearnerInfoProps) => {
	const [selectedLearners, setSelectedLearners] =
		useRecoilState(selectedLearner);

	const onClickLearnerHandler = () => {
		const index = selectedLearners.findIndex((learnerId) => {
			return learnerId === learnerInfo.learnerId;
		});

		if (index === -1) {
			setSelectedLearners([...selectedLearners, learnerInfo.learnerId]);
		} else {
			const deepCopySelectedLearners = [...selectedLearners];
			deepCopySelectedLearners.splice(index, 1);
			setSelectedLearners(deepCopySelectedLearners);
		}
	};

	return (
		<div className="mt-2 flex h-[2.875rem] items-center">
			<div className="mr-3 flex h-full items-center">
				<label className="hidden" htmlFor="checkLearner">
					학생선택
				</label>
				<input
					onChange={onClickLearnerHandler}
					type="checkbox"
					id="checkLearner"
					className="custom-checkBox cursor-pointer"
					checked={
						selectedLearners.includes(learnerInfo.learnerId) ? true : false
					}
				/>
			</div>
			<div
				className={`mx-auto flex h-full w-full items-center justify-between rounded border border-black-100 bg-white sm:w-item-width`}
			>
				<div className="flex h-full grow cursor-pointer items-center pl-4 text-sm text-black-800">
					<p>
						{learnerInfo.learnerName}
						<span> ({learnerInfo.learnerId}) </span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LearnerItem;

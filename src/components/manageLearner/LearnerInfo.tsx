import { ILearnerInfo } from "@/interface/learnerInfo";
import { selectedLearner } from "@/states/manageLearner";
import PointIcon from "@assets/svg/pointIcon.svg?react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

interface ILearnerInfoProps {
	readonly learnerInfo: ILearnerInfo;
}

const LearnerInfo = ({ learnerInfo }: ILearnerInfoProps) => {
	const [selectedLearners, setSelectedLearners] =
		useRecoilState(selectedLearner);
	const [isSelected, setSelected] = useState<boolean>(false);

	const onClickLearnerHandler = () => {
		const index = selectedLearners.findIndex((element) => {
			return element.learnerId === learnerInfo.learnerId;
		});

		if (index === -1) {
			setSelectedLearners([...selectedLearners, learnerInfo]);
			setSelected(true);
		} else {
			const deepCopySelectedLearners = [...selectedLearners];
			deepCopySelectedLearners.splice(index, 1);
			setSelected(false);
			setSelectedLearners(deepCopySelectedLearners);
		}
	};

	useEffect(() => {
		if (selectedLearners.length === 0 && isSelected) {
			setSelected(false);
		}
	}, [selectedLearners]);

	useEffect(() => {
		return () => {
			setSelectedLearners([]);
		};
	}, []);
	return (
		<div
			className={`mx-auto mt-2 flex h-[3.25rem] w-full items-center justify-between rounded ${
				isSelected
					? "border-2 border-iris bg-[rgba(118,120,237,0.3)]"
					: "border border-black-100 bg-white"
			} sm:w-item-width`}
		>
			<div
				onClick={onClickLearnerHandler}
				className="flex h-full grow items-center pl-4 text-black-800"
			>
				<p>{learnerInfo.learnerName}</p>
			</div>
			<button
				type="button"
				className="mx-4 flex h-6 w-6 items-center justify-center rounded-full bg-tangerine"
			>
				<PointIcon width={9} height={12} />
			</button>
		</div>
	);
};

export default LearnerInfo;

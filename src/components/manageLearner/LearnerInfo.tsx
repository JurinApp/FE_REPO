import { ILearnerInfo } from "@/interface/learnerInfo";
import { paymentPointModalState } from "@/states/confirmModalState";
import { allCheckState, selectedLearner } from "@/states/manageLearner";
import PointIcon from "@assets/svg/pointIcon.svg?react";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

interface ILearnerInfoProps {
	readonly learnerInfo: ILearnerInfo;
}

const LearnerInfo = ({ learnerInfo }: ILearnerInfoProps) => {
	const [selectedLearners, setSelectedLearners] =
		useRecoilState(selectedLearner);
	const setIsOpenPaymentPoint = useSetRecoilState(paymentPointModalState);
	const [isAllCheck, setIsAllCheck] = useRecoilState(allCheckState);
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

	const openPaymentPointModalHandler = () => {
		setIsOpenPaymentPoint(true);
	};

	useEffect(() => {
		if (isAllCheck) {
			setSelected(true);
		} else {
			setSelected(false);
		}
	}, [isAllCheck]);

	useEffect(() => {
		return () => {
			setSelectedLearners([]);
		};
	}, []);

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
					className="h-6 w-6"
					checked={isSelected}
				/>
			</div>
			<div
				className={`mx-auto flex h-full w-full items-center justify-between rounded ${
					isSelected
						? "border-2 border-iris bg-[rgba(118,120,237,0.3)]"
						: "border border-black-100 bg-white"
				} sm:w-item-width`}
			>
				<div className="flex h-full grow items-center pl-4 text-sm text-black-800">
					<p>
						{learnerInfo.learnerName}
						<span> ({learnerInfo.learnerId}) </span>
					</p>
				</div>
				<button
					type="button"
					className="mx-4 flex h-6 w-6 items-center justify-center rounded-full bg-tangerine"
					onClick={openPaymentPointModalHandler}
				>
					<PointIcon width={9} height={12} />
				</button>
			</div>
		</div>
	);
};

export default LearnerInfo;

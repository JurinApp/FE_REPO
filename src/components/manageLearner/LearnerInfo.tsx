import { ILearnerInfo } from "@/interface/learnerInfo";
import PointIcon from "@assets/svg/pointIcon.svg?react";

interface ILearnerInfoProps {
	readonly learnerInfo: ILearnerInfo;
}

const LearnerInfo = ({ learnerInfo }: ILearnerInfoProps) => {
	const onClickLearnerHandler = () => {
		console.log("asd");
	};

	return (
		<div className="mx-auto mt-2 flex h-[3.25rem] w-full items-center justify-between rounded border border-black-100 bg-white sm:w-item-width">
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

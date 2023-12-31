import { ILearnerInfo } from "@/interface/learnerInfo";
import LearnerInfo from "./LearnerInfo";

const learnerArr = [
	{ learnerId: "1", learnerName: "공덕현" },
	{ learnerId: "2", learnerName: "김종진" },
	{ learnerId: "3", learnerName: "사재혁" },
	{ learnerId: "4", learnerName: "이수정" },
	{ learnerId: "5", learnerName: "이형규" },
	{ learnerId: "6", learnerName: "조성주" },
];

const LearnerList = () => {
	return (
		<div className="h-manage-height mt-6 overflow-y-auto">
			{learnerArr.map((learnerInfo: ILearnerInfo) => (
				<LearnerInfo key={learnerInfo.learnerId} learnerInfo={learnerInfo} />
			))}
		</div>
	);
};

export default LearnerList;

import { ILearnerInfo } from "@/interface/learnerInfo";
import LearnerInfo from "./LearnerInfo";

const learnerArr = [
	{ learnerId: "1", learnerName: "공덕현" },
	{ learnerId: "2", learnerName: "김종진" },
	{ learnerId: "3", learnerName: "사재혁" },
	{ learnerId: "4", learnerName: "이수정" },
	{ learnerId: "5", learnerName: "이형규" },
	{ learnerId: "6", learnerName: "조성주" },
	{ learnerId: "7", learnerName: "조성주" },
	{ learnerId: "7", learnerName: "조성주" },
	{ learnerId: "1", learnerName: "공덕현" },
	{ learnerId: "2", learnerName: "김종진" },
	{ learnerId: "3", learnerName: "사재혁" },
	{ learnerId: "4", learnerName: "이수정" },
	{ learnerId: "5", learnerName: "이형규" },
	{ learnerId: "6", learnerName: "조성주" },
	{ learnerId: "7", learnerName: "조성주" },
	{ learnerId: "7", learnerName: "조성주" },
	{ learnerId: "1", learnerName: "공덕현" },
	{ learnerId: "2", learnerName: "김종진" },
	{ learnerId: "3", learnerName: "사재혁" },
	{ learnerId: "4", learnerName: "이수정" },
	{ learnerId: "5", learnerName: "이형규" },
	{ learnerId: "6", learnerName: "조성주" },
	{ learnerId: "7", learnerName: "조성주" },
	{ learnerId: "7", learnerName: "조성주" },
];
// h-[30.5rem]
const LearnerList = () => {
	return (
		<div className="">
			<div className="mt-6 h-screen max-h-[20rem] overflow-y-auto">
				{learnerArr.map((learnerInfo: ILearnerInfo, index: number) => (
					<LearnerInfo key={learnerInfo.learnerId} learnerInfo={learnerInfo} />
				))}
			</div>
		</div>
	);
};

export default LearnerList;

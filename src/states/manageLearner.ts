import { ILearnerInfo } from "@/interface/learnerInfo";
import { atom } from "recoil";

export const selectedLearner = atom<ILearnerInfo[]>({
	default: [],
	key: "selectedLearner",
});

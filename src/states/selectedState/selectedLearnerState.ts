import { atom } from "recoil";

export const selectedLearner = atom<number[]>({
	default: [],
	key: "selectedLearner",
});

export const allCheckState = atom<boolean>({
	default: false,
	key: "allCheckState",
});

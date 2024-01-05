import { atom } from "recoil";

export const selectedLearner = atom<string[]>({
	default: [],
	key: "selectedLearner",
});

export const allCheckState = atom<boolean>({
	default: false,
	key: "allCheckState",
});

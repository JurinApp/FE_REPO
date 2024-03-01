import { atom } from "recoil";

export const startDateState = atom<string>({
	default: "",
	key: "startDateState",
});

export const endDateState = atom<string>({
	default: "",
	key: "endDateState",
});

import { atom } from "recoil";

export const headerState = atom<boolean>({
	default: false,
	key: "headerState",
});

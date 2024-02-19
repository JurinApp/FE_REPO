import { atom } from "recoil";

export const selectedItemState = atom<string[]>({
	default: [],
	key: "selectedItemState",
});

export const allCheckItemsState = atom<boolean>({
	default: false,
	key: "allCheckItemsState",
});

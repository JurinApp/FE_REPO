import { atom } from "recoil";

export const selectedItemState = atom<number[]>({
	default: [],
	key: "selectedItemState",
});

export const allCheckItemsState = atom<boolean>({
	default: false,
	key: "allCheckItemsState",
});

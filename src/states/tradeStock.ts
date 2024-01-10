import { atom } from "recoil";

export const selectedStock = atom<string[]>({
	default: [],
	key: "selectedStock",
});

export const allCheckStockState = atom<boolean>({
	default: false,
	key: "allCheckStockState",
});

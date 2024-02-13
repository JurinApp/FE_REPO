import { atom } from "recoil";

export const selectedStockTabState = atom<string>({
	default: "spec",
	key: "selectedStockTabState",
});

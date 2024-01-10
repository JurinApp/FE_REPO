import { atom } from "recoil";

export const TodayTradeFilterState = atom<string>({
	default: "all",
	key: "TodayTradeFilterState",
});

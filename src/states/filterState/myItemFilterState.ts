import { atom } from "recoil";

export const myItemFilterState = atom<string>({
	default: "all",
	key: "myItemFilterState",
});

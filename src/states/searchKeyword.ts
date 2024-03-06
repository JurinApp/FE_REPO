import { atom } from "recoil";

export const searchKeyword = atom<string>({
	default: "",
	key: "searchKeyword",
});

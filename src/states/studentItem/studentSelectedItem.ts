import { IExtendItem } from "@/interface/item";
import { atom } from "recoil";

export const studentSelectedItem = atom<IExtendItem | null>({
	default: null,
	key: "studentSelectedItem",
});

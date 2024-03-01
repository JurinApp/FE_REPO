import { IStudentItem } from "@/interface/item";
import { atom } from "recoil";

export const studentSelectedItem = atom<IStudentItem | null>({
	default: null,
	key: "studentSelectedItem",
});

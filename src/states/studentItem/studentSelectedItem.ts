import { IStudentMyItem } from "@/interface/item";
import { atom } from "recoil";

export const studentSelectedItem = atom<IStudentMyItem | null>({
	default: null,
	key: "studentSelectedItem",
});

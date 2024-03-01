import { atom } from "recoil";

export const selectedStudentItemTabState = atom<string>({
	key: "selectedStudentItemTabState",
	default: "studentItemHome",
});

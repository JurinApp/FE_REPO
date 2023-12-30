import { atom } from "recoil";

export const deleteConfirmModalState = atom<boolean>({
	default: false,
	key: "deleteConfirmModalState",
});

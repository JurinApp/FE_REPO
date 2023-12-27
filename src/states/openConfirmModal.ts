import { atom } from "recoil";

export const openConfirmModalState = atom<boolean>({
	key: "openConfirmModalState",
	default: false,
});

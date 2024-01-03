import { atom } from "recoil";

export const deleteConfirmModalState = atom<boolean>({
	default: false,
	key: "deleteConfirmModalState",
});

export const paymentPointModalState = atom<boolean>({
	default: false,
	key: "paymentPointModalState",
});

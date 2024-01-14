import { atom } from "recoil";

export const deleteConfirmModalState = atom<boolean>({
	default: false,
	key: "deleteConfirmModalState",
});

export const paymentPointModalState = atom<boolean>({
	default: false,
	key: "paymentPointModalState",
});

export const deleteStocksModalState = atom<boolean>({
	default: false,
	key: "deleteStocksModalState",
});

export const deleteItemsModalState = atom<boolean>({
	default: false,
	key: "deleteItemsModalState",
});

export const deleteDetailItemModalState = atom<boolean>({
	default: false,
	key: "deleteDetailItemModalState",
});

export const deletePostsModalState = atom<boolean>({
	default: false,
	key: "deletePostsModalState",
});

export const registerConfirmModalState = atom<boolean>({
	default: false,
	key: "registerConfirmModalState",
});

export const deleteDetailPostModalState = atom<boolean>({
	default: false,
	key: "deleteDetailPostModalState",
});

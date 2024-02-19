import { atom } from "recoil";

// -------- 선생님 권한 학생 관리 --------
export const deleteConfirmModalState = atom<boolean>({
	default: false,
	key: "deleteConfirmModalState",
});

export const paymentPointModalState = atom<boolean>({
	default: false,
	key: "paymentPointModalState",
});

// -------- 선생님 권한 주식 거래  --------
export const deleteStocksModalState = atom<boolean>({
	default: false,
	key: "deleteStocksModalState",
});

export const registerTradeStockModalState = atom<boolean>({
	default: false,
	key: "registerTradeStockModalState",
});

export const editTradeStockModalState = atom<boolean>({
	default: false,
	key: "editTradeStockModalState",
});

export const deleteDetailTradeStockModalState = atom<boolean>({
	default: false,
	key: "deleteDetailTradeStockModalState",
});

// -------- 선생님 권한 아이템 관리 --------
export const registerItemModalState = atom<boolean>({
	default: false,
	key: "registerItemModalState",
});

export const deleteItemsModalState = atom<boolean>({
	default: false,
	key: "deleteItemsModalState",
});

export const editItemModalState = atom<boolean>({
	default: false,
	key: "editItemModalState",
});

export const deleteDetailItemModalState = atom<boolean>({
	default: false,
	key: "deleteDetailItemModalState",
});

// -------- 선생님 권한 게시판 관리 --------
export const deletePostsModalState = atom<boolean>({
	default: false,
	key: "deletePostsModalState",
});

export const registerPostModalState = atom<boolean>({
	default: false,
	key: "registerConfirmModalState",
});

export const deleteDetailPostModalState = atom<boolean>({
	default: false,
	key: "deleteDetailPostModalState",
});

export const editPostModalState = atom<boolean>({
	default: false,
	key: "editPostModalState",
});

// -------- 설정 페이지 관리 --------
export const withdrawalModalState = atom<boolean>({
	default: false,
	key: "withdrawalModalState",
});

// -------- 마이 페이지 관리 --------
export const enterChannelModalState = atom<boolean>({
	default: false,
	key: "enterChannelModalState",
});

export const modifyUserinfoModalState = atom<boolean>({
	default: false,
	key: "modifyUserinfoModalState",
});

export const quitChannelModalState = atom<boolean>({
	default: false,
	key: "quitChannelModalState",
});
// -------- 주문 내역 관리 --------
export const calendarModalState = atom<boolean>({
	default: false,
	key: "calendarModalState",
});

// -------- 학생 아이템 관리 --------
export const itemHistoryModalState = atom<boolean>({
	default: false,
	key: "itemHistoryModalState",
});

export const itemBuyModalState = atom<boolean>({
	default: false,
	key: "itemBuyModalState",
});

export const itemUseModalState = atom<boolean>({
	default: false,
	key: "itemUseModalState",
});

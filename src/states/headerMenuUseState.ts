import { atom } from "recoil";

interface IHeaderMenuUseState {
	isUseHeader: boolean;
	isUseMenu: boolean;
	isUseTab: boolean;
}

export const headerMenuUseState = atom<IHeaderMenuUseState>({
	default: { isUseHeader: false, isUseMenu: false, isUseTab: false },
	key: "headerMenuUseState",
});

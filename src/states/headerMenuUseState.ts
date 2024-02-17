import { atom } from "recoil";

interface IHeaderMenuUseState {
	readonly isUseHeader: boolean;
	readonly isUseMenu: boolean;
	readonly isUseTab: boolean;
}

export const headerMenuUseState = atom<IHeaderMenuUseState>({
	default: { isUseHeader: false, isUseMenu: false, isUseTab: false },
	key: "headerMenuUseState",
});

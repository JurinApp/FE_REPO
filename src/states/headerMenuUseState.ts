import { atom } from "recoil";

interface IHeaderMenuUseState {
	isUseHeader: boolean;
	isUseMenu: boolean;
}

export const headerMenuUseState = atom<IHeaderMenuUseState>({
	default: { isUseHeader: false, isUseMenu: false },
	key: "headerMenuUseState",
});

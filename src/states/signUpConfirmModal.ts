import { atom } from "recoil";

interface ISignUpConfirmModalState {
	readonly selectedAuth: string;
	readonly isModalOpen: boolean;
}

const INITIAL_VALUE = {
	selectedAuth: "1",
	isModalOpen: false,
};

export const signUpConfirmModalState = atom<ISignUpConfirmModalState>({
	key: "signUpConfirmModalState",
	default: INITIAL_VALUE,
});

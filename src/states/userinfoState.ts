import { atom } from "recoil";

interface ICurUser {
	curAuth: string;
}

const INITIAL_VALUE = {
	curAuth: "teacher",
};

export const userinfoState = atom<ICurUser>({
	key: "userinfoState",
	default: INITIAL_VALUE,
});

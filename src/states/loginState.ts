import { getCookie } from "@/utils/cookies";
import { atom } from "recoil";

export const loginState = atom<boolean>({
	default: getCookie("accessToken") !== undefined ? true : false,
	key: "loginState",
});

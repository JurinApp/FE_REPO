import { getCookie } from "@/utils/cookies";
import { decodeToken } from "@/utils/decodeToken";
import { atom } from "recoil";

const TOKEN = getCookie("accessToken");

export const userRoleState = atom<string>({
	key: "userRoleState",
	default: TOKEN ? decodeToken(TOKEN) : "anonymous",
});

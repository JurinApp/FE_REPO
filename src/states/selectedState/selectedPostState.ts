import { atom } from "recoil";

export const selectedPostsState = atom<string[]>({
	default: [],
	key: "selectedPostState",
});

export const allCheckPostsState = atom<boolean>({
	default: false,
	key: "allCheckPostState",
});

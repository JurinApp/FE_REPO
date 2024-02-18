import { atom } from "recoil";

interface IFormValue {
	readonly itemName: string;
	readonly imageFile: File | null;
	readonly imageUrl: string;
	readonly quantity: number;
	readonly price: number;
	readonly content: string;
}

const ITEM_INITIAL_VALUE = {
	itemName: "",
	imageFile: null,
	imageUrl: "",
	quantity: 1,
	price: 0,
	content: "",
};

export const registerItemForm = atom<IFormValue>({
	key: "registerItemForm",
	default: ITEM_INITIAL_VALUE,
});

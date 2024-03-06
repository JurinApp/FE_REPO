export interface IItem {
	readonly id: number;
	readonly title: string;
	readonly imageUrl: string;
	readonly amount?: number;
	readonly price?: number;
}

export interface IExtendItem extends IItem {
	readonly isUsed?: boolean;
	readonly remainingAmount?: number;
}

export interface IItemResponseData {
	readonly limit: number;
	readonly offset: number;
	readonly count: number;
	readonly next: string | null;
	readonly previous: string | null;
	readonly results: IExtendItem[];
}

export interface IErrorMessages {
	readonly [key: string]: string;
}

/********* 학생 권한 **********/

export interface MyItem {
	readonly id: number;
	readonly title: string;
	readonly imageUrl: string;
	readonly price: number;
	readonly remainingAmount: number;
	readonly isUsed: boolean;
}

export interface IMyItemResponseData {
	readonly limit: number;
	readonly offset: number;
	readonly count: number;
	readonly next: string | null;
	readonly previous: string | null;
	readonly results: MyItem[];
}

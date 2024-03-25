export interface IItem {
	readonly id: number;
	readonly title: string;
	readonly imageUrl: string;
	readonly isSoldOut?: boolean;
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
export interface IMyItem {
	readonly id: number;
	readonly title: string;
	readonly imageUrl: string;
	readonly price: number;
	readonly remainingAmount: number;
	readonly isUsed: boolean;
	readonly type: string;
}

export interface IUsedItem extends IMyItem {
	readonly usedAmount: number;
	readonly isAllUsed: boolean;
}

export interface IAvailableItem extends IMyItem {
	readonly remainingAmount: number;
}

export interface IMyItemListData {
	readonly usedItem: IUsedItem[];
	readonly availableItem: IAvailableItem[];
}

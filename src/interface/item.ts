/********** 선생님 권한 *********/
export interface IItem {
	readonly id: string;
	readonly title: string;
	readonly imageUrl: string;
}

export interface IItemResponseData {
	readonly limit: number;
	readonly offset: number;
	readonly count: number;
	readonly next: string | null;
	readonly previous: string | null;
	readonly results: IItem[];
}

export interface IErrorMessages {
	readonly [key: string]: string;
}

/********* 학생 권한 **********/
export interface IStudentItem {
	readonly id: number;
	readonly title: string;
	readonly amount?: number;
	readonly price: number;
	readonly imageUrl: string;
}

export interface IStudentMyItem extends IStudentItem {
	readonly isUsed?: boolean;
	readonly remainingAmount?: number;
}

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

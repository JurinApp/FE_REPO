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

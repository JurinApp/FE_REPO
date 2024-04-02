export interface IPost {
	readonly id: string;
	readonly mainTitle: string;
	readonly subTitle: string;
	readonly date: string;
}

export interface IPostResponseData {
	readonly limit: number;
	readonly offset: number;
	readonly count: number;
	readonly next: string | null;
	readonly previous: string | null;
	readonly results: IPost[];
}

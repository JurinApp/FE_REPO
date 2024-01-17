export interface IPost {
	readonly postId: string;
	readonly postTitle: string;
	readonly postContent: string;
	readonly postRegDate: string;
}

export interface IPostFormValue {
	readonly itemName: string;
	readonly registerDate: string;
	readonly title: string;
	readonly content: string;
}

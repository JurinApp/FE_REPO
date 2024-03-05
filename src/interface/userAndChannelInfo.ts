export interface IUser {
	readonly user: {
		readonly id: number;
		readonly nickname: string;
		readonly schoolName: string;
		readonly userRole: string;
	};
	readonly channel: string;
}

export interface IChannel {
	readonly id: number;
	readonly channelName: string;
	readonly entryCode: string;
	readonly isPendingDeleted: boolean;
}

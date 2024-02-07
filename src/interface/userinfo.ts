export interface IUser {
	readonly user: {
		id: number;
		nickname: string;
		schoolName: string;
		userRole: string;
	};
	readonly channel?: {
		name: string;
	};
}

export interface IChannel {
	readonly channelName: string;
	readonly entryCode: string;
}

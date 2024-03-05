interface IChannelInfoProps {
	channel?: {
		readonly id: number;
		readonly channelName: string;
		readonly entryCode: string;
	};
}

const ChannelInfo = ({ channel }: IChannelInfoProps) => {
	return (
		<>
			{channel ? (
				<div
					className="mx-auto mb-4 flex h-[6.375rem] w-full flex-col justify-center  rounded border border-black border-opacity-10 bg-white sm:w-[22.563rem] "
					id="channelSection"
				>
					<div className="my-2 ml-4 flex gap-4">
						<label className="text-black text-opacity-80" htmlFor="school">
							채널
						</label>
						<p className="font-medium">{channel.channelName}</p>
					</div>
					<div className="my-2 ml-4 flex gap-4">
						<label className="text-black text-opacity-80" htmlFor="authority">
							코드
						</label>
						<p className="font-medium">{channel.entryCode}</p>
					</div>
				</div>
			) : (
				<div
					className="ml-4 flex h-[6.375rem] w-[361px] flex-col items-center justify-center rounded border border-black-100 bg-black-100"
					id="channelSection"
				>
					<p className="font-medium">채널 정보가 존재하지 않습니다.</p>
				</div>
			)}
		</>
	);
};

export default ChannelInfo;

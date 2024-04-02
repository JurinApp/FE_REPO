interface IChannelInfoProps {
	channel?: {
		readonly id: number;
		readonly channelName: string;
		readonly entryCode: string;
	};
}

const ChannelInfo = ({ channel }: IChannelInfoProps) => {
	return (
		<div
			className={`mx-auto mb-4 flex h-[6.375rem] w-full flex-col justify-center rounded border border-black-100 ${
				channel ? "bg-white" : "items-center bg-black-100"
			} sm:w-[22.563rem]`}
		>
			{channel ? (
				<>
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
				</>
			) : (
				<p className="font-medium">채널 정보가 존재하지 않습니다.</p>
			)}
		</div>
	);
};

export default ChannelInfo;

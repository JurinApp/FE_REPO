export const CreateChannelContainer = () => {
	return (
		<div className="mx-auto h-[calc(100vh-2.938rem)] w-[393px] bg-[#ffffff]">
			<div className="flex h-full flex-col justify-end gap-4">
				<h1 className=" ml-4 text-[1.625rem] font-bold">채널 생성</h1>
				<div
					className="mx-4 mt-4 flex h-auto w-[361px] flex-col gap-4 rounded"
					id="channelSection"
				>
					<label htmlFor="channel-name" className="font-bold">
						채널 이름
					</label>
					<input
						type="text"
						id="channel-name"
						placeholder="채널 이름"
						autoComplete="off"
						className="border-b pb-2 text-base placeholder-gray-300 focus:border-b focus:border-gray-700 focus:outline-none"
					/>
					<p className="mx-auto mt-16 text-sm font-normal text-[#3d348b]">
						채널 생성 시 코드가 랜덤으로 부여됩니다.
					</p>
				</div>
				<div
					className="mb-8 ml-4 flex h-[3.188rem] w-[361px] items-center justify-center rounded bg-[#3d348b]"
					id="button"
				>
					<p className="font-[500] text-white">생성</p>
				</div>
			</div>
		</div>
	);
};

const CreateChannelPage = () => {
	return (
		<div className="mx-auto h-[852px] w-[393px] bg-[#ffffff] ">
			<div className="flex h-[852px] flex-col justify-end gap-4">
				<h1 className=" ml-4 text-[30px] font-[700]">채널 생성</h1>
				<div
					className="mx-4 mt-4 flex h-auto w-[361px] flex-col gap-4 rounded"
					id="channelSection"
				>
					<label htmlFor="channel-name" className="font-[700]">
						채널 이름
					</label>
					<input
						type="text"
						id="channel-name"
						placeholder="채널 이름"
						className="border-b pb-4 placeholder-gray-300"
					/>
					<p className="mx-auto mt-16 text-[14px] font-[400] text-[#3d348b]">
						채널 생성 시 코드가 랜덤으로 부여됩니다.
					</p>
				</div>
				<div
					className="mb-8 ml-4 flex h-[51px] w-[361px] items-center justify-center rounded bg-[#3d348b]"
					id="button"
				>
					<p className="font-[500] text-white">생성</p>
				</div>
			</div>
		</div>
	);
};

export default CreateChannelPage;

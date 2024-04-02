import useCreateChannel from "@/hooks/mutations/myPage/useCreateChannel";
import useInput from "@/hooks/useInput";
import { FormEvent } from "react";

const CreateChannelContainer = () => {
	const [channelName, setChannelName] = useInput("");
	const { mutate } = useCreateChannel();

	const handleCreateChannel = (e: FormEvent) => {
		e.preventDefault();
		const result = confirm("채널 생성을 하시겠습니까?");
		if (!result) return;
		mutate({ channelName: channelName });
	};

	return (
		<div className="mx-auto h-[calc(100vh-2.938rem)] w-[393px] bg-white">
			<div className="flex h-full w-full flex-col justify-end gap-4">
				<h1 className=" ml-4 text-[1.625rem] font-bold">채널 생성</h1>
				<form
					onSubmit={handleCreateChannel}
					className="mx-4 mt-4 flex h-auto w-[361px] flex-col gap-4 rounded"
				>
					<label htmlFor="channel-name" className="font-bold">
						채널 이름
					</label>
					<input
						type="text"
						id="channel-name"
						placeholder="채널 이름"
						onChange={setChannelName}
						autoComplete="off"
						className="border-b pb-2 text-base placeholder-gray-300 focus:border-b focus:border-gray-700 focus:outline-none"
					/>
					<p className="mx-auto mt-16 text-sm font-normal text-tekhelet">
						채널 생성 시 코드가 랜덤으로 부여됩니다.
					</p>
					<button
						type="submit"
						className="mb-8 flex h-[3.188rem] w-full items-center justify-center rounded bg-tekhelet font-medium text-white"
					>
						생성
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateChannelContainer;

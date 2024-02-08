import useAxios from "@/hooks/useAxios";
import useInput from "@/hooks/useInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

interface createChannelData {
	channelName: string;
}

const CreateChannelContainer = () => {
	const { axiosData } = useAxios();

	const [channelName, setChannelName] = useInput("");
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const createChannel = async (submitData: createChannelData) => {
		const apiUrl = "/teachers/api/v1/channels";
		const response = await axiosData("useToken", {
			method: "POST",
			url: apiUrl,
			data: submitData,
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				navigate("/mypage");
				return response.data.data;
			}
		}
	};

	const { mutate } = useMutation({
		mutationFn: createChannel,
		onSuccess: () => {
			console.log("채널 생성 성공");
			queryClient.invalidateQueries({ queryKey: ["channelInfo"] });
		},
	});

	const handleCreateChannel = () => {
		const submitData: createChannelData = {
			channelName: channelName,
		};
		mutate(submitData);
	};

	return (
		<div className="mx-auto h-[calc(100vh-2.938rem)] w-[393px] bg-[#ffffff]">
			<div className="flex h-full flex-col justify-end gap-4">
				<h1 className=" ml-4 text-[1.625rem] font-bold">채널 생성</h1>
				<form
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
						onChange={setChannelName}
						autoComplete="off"
						className="border-b pb-2 text-base placeholder-gray-300 focus:border-b focus:border-gray-700 focus:outline-none"
					/>
					<p className="mx-auto mt-16 text-sm font-normal text-[#3d348b]">
						채널 생성 시 코드가 랜덤으로 부여됩니다.
					</p>
				</form>
				<button
					className="mb-8 ml-4 flex h-[3.188rem] w-[361px] items-center justify-center rounded bg-[#3d348b]"
					id="button"
					onClick={handleCreateChannel}
				>
					<p className="font-[500] text-white">생성</p>
				</button>
			</div>
		</div>
	);
};

export default CreateChannelContainer;

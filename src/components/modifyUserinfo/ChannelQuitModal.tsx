import useAxios from "@/hooks/useAxios";
import { IChannel } from "@/interface/userinfo";
import { quitChannelModalState } from "@/states/confirmModalState";
import { userRoleState } from "@/states/userRoleState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

const ChannelQuitModal = () => {
	const { axiosData } = useAxios();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [isQuitChannelModalOpen, setIsQuitChannelModalOpen] = useRecoilState(
		quitChannelModalState,
	);
	const fetchChannel = async () => {
		const apiUrl = `/${role}s/api/v1/channels`;
		const response = await axiosData("useToken", {
			method: "GET",
			url: apiUrl,
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				return response.data.data;
			}
		}
	};
	const channelInfoQuery = useQuery({
		queryKey: ["channelInfo"],
		queryFn: fetchChannel,
	});
	const role = useRecoilValue(userRoleState);

	const channelInfo: IChannel = channelInfoQuery.data;
	const channelId = channelInfo.id;
	const channelName = channelInfo.channelName;

	const modalRef = useRef(null);

	const deleteChannel = async (id: number) => {
		const apiUrl = `/teachers/api/v1/channels/${id}`;
		const response = await axiosData("useToken", {
			method: "DELETE",
			url: apiUrl,
		});
		if (response) {
			const status = response.status;
			if (status === 204) {
				queryClient.invalidateQueries({
					queryKey: ["channelInfo"],
				});
				navigate("/mypage");
				setIsQuitChannelModalOpen(false);
			}
		}
	};

	const handleQuitChannel = async () => {
		const apiUrl = `/students/api/v1/channels/${channelId}`;
		const response = await axiosData("useToken", {
			method: "DELETE",
			url: apiUrl,
		});
		if (response) {
			const status = response.status;
			if (status === 204) {
				queryClient.invalidateQueries({
					queryKey: ["channelInfo"],
				});
				navigate("/mypage");
				setIsQuitChannelModalOpen(false);
			}
		}
	};

	const { mutate } = useMutation({
		mutationFn: deleteChannel,
		onSuccess: () => {
			console.log("채널 삭제 완료");
			queryClient.invalidateQueries({ queryKey: ["userinfo"] });
			queryClient.invalidateQueries({ queryKey: ["channelInfo"] });
		},
	});

	const handleDeleteChannel = () => {
		if (channelId) {
			mutate(channelId);
		}
	};

	const handleModalClose = () => {
		setIsQuitChannelModalOpen(false);
	};

	let message = role === "teacher" ? "삭제하시겠습니까?" : "탈퇴하시겠습니까?";

	return (
		<>
			<div
				className={`fixed left-0 top-0 z-[100] ${
					isQuitChannelModalOpen ? "flex" : "hidden"
				} h-full w-full flex-col items-center justify-center bg-black-700`}
			>
				<div ref={modalRef} className="w-[20rem]">
					<div className="bg-opacity-2 flex h-[11.75rem] flex-col items-center justify-center bg-white">
						<p className="font-medium text-black">
							<span className="font-bold">{channelName}</span> 채널을 <br />
							{message}
						</p>
						<p className="text-[0.875rem] font-normal text-danger">
							삭제 시 채널 내 아이템 및 정보가 삭제됩니다.
						</p>
					</div>
					<div className="flex h-[3.75rem] flex-row">
						<button className="w-1/2 bg-gray-300" onClick={handleModalClose}>
							취소
						</button>
						<button
							className="w-1/2 bg-danger text-white"
							onClick={
								role === "teacher" ? handleDeleteChannel : handleQuitChannel
							}
						>
							{role === "teacher" ? "삭제" : "탈퇴"}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChannelQuitModal;

import { userRoleState } from "@/states/userRoleState";
import { useRecoilValue } from "recoil";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAxios from "@/hooks/useAxios";
import Spinner from "@/components/common/spinner/Spinner";
import { changeDateFormat } from "@/utils/changeDateFormat";

const DetailPostInfo = () => {
	const userRole = useRecoilValue(userRoleState);
	const { channelId, postId } = useParams();
	const { axiosData } = useAxios();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [replaceRegisterDate, setReplaceRegisterDate] = useState<string>("");

	const replacePostDate = (postRegisterDate: string) => {
		const replaceDate = changeDateFormat(postRegisterDate);
		setReplaceRegisterDate(replaceDate);
	};

	const getPostDetailData = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/${userRole}s/api/v1/channels/${channelId}/posts/${postId}`,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				replacePostDate(response.data.data.date);
				return response.data.data;
			}

			if (status === 404) {
				alert("존재하지 않는 게시글입니다.");
				queryClient.cancelQueries({
					queryKey: ["detailPost", channelId, postId],
				});
				navigate(`/${channelId}/post`);
			}
		}
	};

	const { data, isLoading } = useQuery({
		queryKey: ["detailPost", channelId, postId],
		queryFn: getPostDetailData,
	});

	return (
		<div className={`${userRole === "student" && "pt-6"} px-4 sm:px-0`}>
			{isLoading ? (
				<Spinner />
			) : (
				<div className="mx-auto w-full overflow-y-auto rounded-[0.25rem] border border-black-100 bg-white pb-6 sm:w-[22.653rem]">
					<div className="max-h-[10rem] px-4 sm:max-h-56">
						<p className="mt-6 border-b border-black-100 pb-4 font-bold">
							{data.mainTitle}
						</p>
						<div className="mt-[0.875rem] flex">
							<div className="flex flex-col">
								<label className="w-[2.813rem] text-black-800">날짜</label>
								<label className="mt-[0.375rem] w-[2.813rem] text-black-800">
									제목
								</label>
								<label className="mt-[0.375rem] w-[2.813rem] text-black-800">
									내용
								</label>
							</div>
							<div className="flex flex-col">
								<p className="ml-[0.625rem] font-medium">
									{replaceRegisterDate}
								</p>
								<p className="ml-[0.625rem] mt-[0.375rem] font-medium">
									{data.subTitle}
								</p>
								<p className="ml-[0.625rem] mt-[0.375rem] whitespace-pre-wrap">
									{data.content}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DetailPostInfo;

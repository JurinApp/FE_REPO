import Spinner from "@/components/common/spinner/Spinner";
import useDetailPost from "@/hooks/queries/post/useDetailPost";
import { userRoleState } from "@/states/userRoleState";
import { changeDateFormat } from "@/utils/changeDateFormat";
import { useState } from "react";
import { useRecoilValue } from "recoil";

const DetailPostInfo = () => {
	const userRole = useRecoilValue(userRoleState);
	const [replaceRegisterDate, setReplaceRegisterDate] = useState<string>("");

	const replacePostDate = (postRegisterDate: string) => {
		const replaceDate = changeDateFormat(postRegisterDate);
		setReplaceRegisterDate(replaceDate);
	};

	const { data, isLoading } = useDetailPost(replacePostDate);

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

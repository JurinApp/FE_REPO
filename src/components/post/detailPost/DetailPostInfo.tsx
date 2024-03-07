import Spinner from "@/components/common/spinner/Spinner";
import useDetailPost from "@/hooks/queries/post/useDetailPost";
import { userRoleState } from "@/states/userRoleState";
import { changeDateFormat } from "@/utils/changeDateFormat";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const DetailPostInfo = () => {
	const userRole = useRecoilValue(userRoleState);
	const [replaceRegisterDate, setReplaceRegisterDate] = useState<string>("");

	const replacePostDate = (postRegisterDate: string) => {
		const replaceDate = changeDateFormat(postRegisterDate);
		setReplaceRegisterDate(replaceDate);
	};

	const { data, isLoading } = useDetailPost();

	useEffect(() => {
		if (data) {
			replacePostDate(data.date);
		}
	}, [data]);

	return (
		<div className={`${userRole === "student" && "pt-6"} px-4 sm:px-0`}>
			{isLoading ? (
				<Spinner />
			) : (
				<div className="mx-auto max-h-[10rem] w-full overflow-y-auto rounded-[0.25rem] border border-black-100 bg-white pb-6 sm:max-h-[35rem] sm:w-[22.653rem]">
					<div className="px-4">
						<p className="mt-6 border-b border-black-100 pb-4 font-bold">
							{data.mainTitle}
						</p>
						<div className="flex w-60 flex-col">
							<div className="mt-[0.875rem] flex">
								<label htmlFor="" className="w-[2.813rem]">
									날짜
								</label>
								<p className="w-48">{replaceRegisterDate}</p>
							</div>
							<div className="mt-[0.875rem] flex">
								<label htmlFor="" className="w-[2.813rem]">
									제목
								</label>
								<p className="w-48 whitespace-pre-wrap break-words">
									{data.subTitle}
								</p>
							</div>
							<div className="mb-3 mt-[0.875rem] flex w-full">
								<label htmlFor="" className="w-[2.813rem]">
									내용
								</label>
								<p className="w-48 whitespace-pre-wrap">{data.content}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DetailPostInfo;

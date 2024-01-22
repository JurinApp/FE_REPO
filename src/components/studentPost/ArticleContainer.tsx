import { useParams } from "react-router";
import GoBackButton from "../common/GoBackButton/GoBackButton";

const ArticleContainer = () => {
	const { articleId } = useParams<{ articleId: string }>();
	console.log(articleId);

	const fetchArticle = (articleId: string) => {
		// TODO: articleId로 게시글 조회 API 호출
	};
	return (
		<>
			<GoBackButton />
			<div className="mx-auto h-[calc(100vh-8rem)] w-full bg-btn-cancel-tekhelet pt-6 sm:w-[24.563rem]">
				<div className="mx-auto w-full overflow-y-auto rounded-[0.25rem] border border-black-100 bg-white pb-6 sm:w-[22.653rem]">
					<div className="px-4">
						<p className="mt-6 border-b border-black-100 pb-4 font-bold">
							선생님의 몸무게
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
								<p className="ml-[0.625rem] font-medium">2023. 12. 27 (수)</p>
								<p className="ml-[0.625rem] mt-[0.375rem] font-medium">
									이번주 (12/23 - 25) 주말 계획
								</p>
								<p className="ml-[0.625rem] mt-[0.375rem]">
									이번주 크리스마스를 맞이하여 주말에 가족들과 백화점에 가서
									쇼핑도 하고, 비싸고 맛있는 것도 먹을 계획입니다.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ArticleContainer;

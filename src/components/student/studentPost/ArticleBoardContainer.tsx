import React from "react";
import { Link } from "react-router-dom";
const SAMPLE_DATA = [
	{
		articleId: 1,
		name: "선생님의 몸무게",
		date: "2023. 12. 27 (수)",
		title: "이번주 크리스마스",
		content:
			"이번주 크리스마스를 맞이하여 주말에 가족들과 백화점에 가서 쇼핑도 하고, 비싸고 맛있는 것도 먹을 계횝입니다.",
	},
	{
		articleId: 2,
		name: "선생님의 몸무게",
		date: "2023. 12. 27 (수)",
		title: "이번주 크리스마스",
		content:
			"이번주 크리스마스를 맞이하여 주말에 가족들과 백화점에 가서 쇼핑도 하고, 비싸고 맛있는 것도 먹을 계횝입니다.",
	},
	{
		articleId: 3,
		name: "선생님의 몸무게",
		date: "2023. 12. 27 (수)",
		title: "이번주 크리스마스",
		content:
			"이번주 크리스마스를 맞이하여 주말에 가족들과 백화점에 가서 쇼핑도 하고, 비싸고 맛있는 것도 먹을 계횝입니다.",
	},
	{
		articleId: 4,
		name: "선생님의 몸무게",
		date: "2023. 12. 27 (수)",
		title: "이번주 크리스마스",
		content:
			"이번주 크리스마스를 맞이하여 주말에 가족들과 백화점에 가서 쇼핑도 하고, 비싸고 맛있는 것도 먹을 계횝입니다.",
	},
];
const ArticleBoardContainer = () => {
	return (
		<div className="mx-auto w-full bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<div className="h-[calc(100vh-8rem)]">
				<div id="articleList" className="mx-4 flex flex-col gap-2 pt-6">
					{SAMPLE_DATA.map((article) => (
						<>
							<Link to={`/articleBoard/${article.articleId}`}>
								<div
									key={article.articleId}
									id="articleBox"
									className="flex h-[72px] w-[361px] flex-col rounded border border-black-300 bg-white px-[14px]"
								>
									<p className="mt-[14px] text-base font-bold">
										{article.name}
									</p>
									<div className="mb-[14px] flex flex-row justify-between">
										<p className="text-sm font-normal">{article.title}</p>
										<p className="text-sm font-normal text-black-300">
											{article.date}
										</p>
									</div>
								</div>
							</Link>
						</>
					))}
				</div>
			</div>
		</div>
	);
};

export default ArticleBoardContainer;

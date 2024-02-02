import useInput from "@/hooks/useInput";
import SearchIcon from "@assets/svg/searchIcon.svg?react";
import { useEffect } from "react";

const LearnerSearch = () => {
	const [keyword, setKeyword] = useInput("");

	const handleSearchLearner = () => {
		// TODO : keyword에 입력이 있을 경우에만 검색되게 API 구현되면 추가 예정
		console.log(keyword);
	};

	useEffect(() => {
		if (keyword.length !== 0) {
			handleSearchLearner();
		}
	}, [keyword]);

	return (
		<form className="mt-[0.125rem] flex items-center border-b border-black-800 ">
			<input
				type="text"
				onChange={setKeyword}
				className="h-12 w-full grow bg-inherit outline-none placeholder:text-black-300"
				placeholder="찾고 있는 학생을 검색해보세요."
			/>
			<SearchIcon className="mr-[0.875rem] h-6 w-6 cursor-pointer" />
		</form>
	);
};

export default LearnerSearch;

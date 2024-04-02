import { searchKeyword } from "@/states/searchKeyword";
import SearchIcon from "@assets/svg/searchIcon.svg?react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRecoilState } from "recoil";

const LearnerSearch = () => {
	const [keyword, setKeyword] = useRecoilState(searchKeyword);
	const [searchInput, setSearchInput] = useState<string>("");

	const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const handleSearchLearner = (e: FormEvent) => {
		e.preventDefault();
		setKeyword(searchInput);
	};

	return (
		<form
			className="mt-[0.125rem] flex items-center border-b border-black-800"
			onSubmit={handleSearchLearner}
		>
			<input
				type="text"
				onChange={handleChangeKeyword}
				defaultValue={keyword}
				className="h-12 w-full grow bg-inherit outline-none placeholder:text-black-300"
				placeholder="찾고 있는 학생을 검색해보세요."
				maxLength={8}
			/>
			<SearchIcon className="mr-[0.875rem] h-6 w-6 cursor-pointer" />
		</form>
	);
};

export default LearnerSearch;

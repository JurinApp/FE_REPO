import useInput from "@/hooks/useInput";
import SearchIcon from "@assets/svg/searchIcon.svg?react";
import { FormEvent } from "react";

interface ILearnerSearchProps {
	readonly searchKeyword: string;
	readonly setSearchKeyword: (keyword: string) => void;
}

const LearnerSearch = ({
	searchKeyword,
	setSearchKeyword,
}: ILearnerSearchProps) => {
	const [keyword, setKeyword] = useInput("");

	const searchLearner = async () => {
		setSearchKeyword(keyword);
	};

	const handleSearchLearner = (e: FormEvent) => {
		e.preventDefault();
		searchLearner();
	};

	return (
		<form
			className="mt-[0.125rem] flex items-center border-b border-black-800"
			onSubmit={handleSearchLearner}
		>
			<input
				type="text"
				onChange={setKeyword}
				defaultValue={searchKeyword}
				className="h-12 w-full grow bg-inherit outline-none placeholder:text-black-300"
				placeholder="찾고 있는 학생을 검색해보세요."
				maxLength={8}
			/>
			<SearchIcon className="mr-[0.875rem] h-6 w-6 cursor-pointer" />
		</form>
	);
};

export default LearnerSearch;

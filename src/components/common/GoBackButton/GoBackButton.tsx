import Back from "@assets/svg/backIcon.svg?react";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
	const navigate = useNavigate();

	const goBackHandler = () => {
		navigate(-1);
	};

	return (
		<header className="sticky top-0 z-[99] mx-auto flex h-[2.938rem] w-full items-center border-b border-black-200 bg-white px-4 sm:w-[24.563rem]">
			<Back onClick={goBackHandler} />
		</header>
	);
};

export default GoBackButton;

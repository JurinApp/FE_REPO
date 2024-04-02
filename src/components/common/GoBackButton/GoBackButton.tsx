import Back from "@assets/svg/backIcon.svg?react";
import { useNavigate } from "react-router-dom";

interface StockHeaderProps {
	name?: string;
	readonly backNavigationPath: string;
}
const GoBackButton = ({ name, backNavigationPath }: StockHeaderProps) => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		backNavigationPath === "back" ? navigate(-1) : navigate(backNavigationPath);
	};

	return (
		<header className="sticky top-0 z-[99] mx-auto flex h-[2.938rem] w-full items-center border-b border-black-200 bg-white px-4 sm:w-[24.563rem]">
			<Back onClick={handleGoBack} className="cursor-pointer" />
			<p className="ml-2 text-base font-bold text-black">{name}</p>
		</header>
	);
};

export default GoBackButton;

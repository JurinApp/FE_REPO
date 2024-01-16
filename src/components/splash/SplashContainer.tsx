import Logo from "@assets/svg/whiteLogo.svg?react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SplashContainer = () => {
	const [isAnimate, setIsAnimate] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		const navigateTimer = setTimeout(() => {
			navigate("/login");
		}, 2000);

		const animationTimer = setTimeout(() => {
			setIsAnimate(true);
		}, 1800);

		return () => {
			clearTimeout(navigateTimer);
			clearTimeout(animationTimer);
		};
	}, []);

	return (
		<div
			className={`flex h-screen w-screen flex-col bg-medium-slate-blue ${
				isAnimate && "animate-slide-in"
			}`}
		>
			<figure className="flex grow flex-col items-center justify-center">
				<Logo className="h-[8.875rem] w-[7.625rem]" />
				<figcaption className="mt-[1.875rem] font-Title text-3xl font-light text-white">
					주린이를 부탁해
				</figcaption>
			</figure>
			<p className="mb-[3.188rem] text-center font-Roboto font-light text-white">
				project. zero
			</p>
		</div>
	);
};

export default SplashContainer;

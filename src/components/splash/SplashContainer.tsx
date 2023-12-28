import Logo from "@assets/svg/whiteLogo.svg?react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SplashContainer = () => {
	const [isAnimate, setIsAnimate] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		const navigateTimer = setTimeout(() => {
			// TODO : 로그인 여부에 따라 로그인이 되어 있으면 채널 선택 페이지로 아니면 로그인 페이지로 API 추가되면 코드 작성 예정
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
				<Logo width={122} height={142} />
				<figcaption className="mt-[1.875rem] font-Title text-3xl font-light text-white">
					주린이를 부탁해
				</figcaption>
			</figure>
			<p className="font-Roboto mb-[3.188rem] text-center font-light text-white">
				project. zero
			</p>
		</div>
	);
};

export default SplashContainer;

import Logo from "@assets/svg/colorLogo.svg?react";

const LogoSection = () => {
	return (
		<div>
			<figure>
				<Logo width={110} height={118} className="mx-auto mt-24" />
				<figcaption className="text-iris font-Title mt-6 text-center text-[1.75rem] font-light">
					주린이를 부탁해
				</figcaption>
			</figure>
		</div>
	);
};

export default LogoSection;

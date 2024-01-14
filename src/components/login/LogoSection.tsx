import Logo from "@assets/svg/colorLogo.svg?react";

const LogoSection = () => {
	return (
		<div>
			<figure>
				<Logo className="mx-auto mt-24 h-[7.375rem] w-[6.875rem]" />
				<figcaption className="mt-6 text-center font-Title text-[1.75rem] font-light text-iris">
					주린이를 부탁해
				</figcaption>
			</figure>
		</div>
	);
};

export default LogoSection;

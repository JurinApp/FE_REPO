import Logo from "@assets/svg/colorLogo.svg?react";

const SignUpHeader = () => {
	return (
		<header className="border-black-200 h-[2.938rem] border-b">
			<figure className="flex h-full items-center px-4">
				<Logo width={20} height={24} />
				<p className="font-Title text-iris ml-2 font-light">주린이를 부탁해</p>
			</figure>
		</header>
	);
};

export default SignUpHeader;

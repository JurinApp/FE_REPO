import Logo from "@assets/svg/colorLogo.svg?react";
import Setting from "@assets/svg/setting.svg?react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="sticky top-0 z-[99] mx-auto h-[2.938rem] w-full border-b border-black-200 bg-white sm:w-[24.563rem]">
			<figure className="flex h-full items-center justify-between px-4">
				<div className="flex items-center">
					<Logo width={20} height={24} />
					<p className="ml-2 font-Title font-light text-iris">
						주린이를 부탁해
					</p>
				</div>
				<div className="flex items-center justify-center">
					<Link to="/setting">
						<Setting />
					</Link>
				</div>
			</figure>
		</header>
	);
};

export default Header;

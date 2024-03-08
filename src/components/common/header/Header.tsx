import { userRoleState } from "@/states/userRoleState";
import Logo from "@assets/svg/colorLogo.svg?react";
import Setting from "@assets/svg/setting.svg?react";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";

const Header = () => {
	const userRole = useRecoilValue(userRoleState);
	const location = useLocation();

	const path = useMemo(() => {
		const pathName = location.pathname;
		const channelId = location.pathname.substring(1, 2);

		if (pathName === "/mypage") {
			return "/mypage";
		}

		if (pathName === "/signUp") {
			return "/login";
		}

		if (userRole === "teacher") {
			return `/${channelId}/manageLearner`;
		}

		if (userRole === "student") {
			return `/${channelId}/trade/home`;
		}

		return "";
	}, [location.pathname, userRole]);

	return (
		<header className="sticky top-0 z-[99] mx-auto h-[2.938rem] w-full border-b border-black-200 bg-white sm:w-[24.563rem]">
			<figure className="flex h-full items-center justify-between px-4">
				<Link to={path} className="flex items-center">
					<Logo className="h-6 w-5" />
					<p className="ml-2 font-Title font-light text-iris">
						주린이를 부탁해
					</p>
				</Link>
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

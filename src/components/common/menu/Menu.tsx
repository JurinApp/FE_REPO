import { userRoleState } from "@/states/userRoleState";
import BucketIcon from "@assets/svg/bucketIcon.svg?react";
import ClipIcon from "@assets/svg/clipSvg.svg?react";
import TradeIcon from "@assets/svg/tradeIcon.svg?react";
import UserIcon from "@assets/svg/userIcon.svg?react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

interface IMenu {
	readonly key: string;
	readonly name: string;
	readonly path: string;
}

const menuArr = [
	{ key: "manageLearner", name: "학생관리", path: "/manageLearner" },
	{ key: "trade", name: "주식거래", path: "/trade/home" },
	{ key: "item", name: "아이템", path: "/item" },
	{ key: "post", name: "게시판", path: "/post" },
];

const Menu = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [selectedMenu, setSelectedMenu] = useState<string>(menuArr[0].key);
	const userRole = useRecoilValue(userRoleState);
	let filterMenuArr: IMenu[] = [];

	if (userRole === "student") {
		filterMenuArr = menuArr.filter((menu) => menu.key !== "manageLearner");
	} else {
		filterMenuArr = menuArr;
	}

	const handleClickMenu = (menu: IMenu) => {
		setSelectedMenu(menu.key);
		const channelId = location.pathname.substring(1, 2);
		navigate(`/${channelId}${menu.path}`);
	};

	useEffect(() => {
		const path = location.pathname;
		if (path.includes("manageLearner")) {
			setSelectedMenu("manageLearner");
		}
		if (path.includes("trade") || path.includes("stock")) {
			setSelectedMenu("trade");
		}
		if (path.includes("item")) {
			setSelectedMenu("item");
		}
		if (path.includes("post")) {
			setSelectedMenu("post");
		}
	}, []);

	return (
		<div className="sticky bottom-0 z-[99] mx-auto h-[4.188rem] w-full bg-white px-6 py-[0.5rem] sm:w-[24.563rem]">
			<div className="flex items-center justify-between">
				{filterMenuArr.map((menu: IMenu) => (
					<div
						key={menu.key}
						className="flex cursor-pointer flex-col items-center"
						onClick={() => handleClickMenu(menu)}
					>
						{menu.key === "manageLearner" && (
							<UserIcon
								className={`h-[1.75rem] w-[1.625rem] ${
									menu.key === selectedMenu
										? "fill-iris"
										: "fill-black opacity-30"
								}`}
							/>
						)}
						{menu.key === "trade" && (
							<TradeIcon
								className={`h-[1.75rem] w-[1.625rem] ${
									menu.key === selectedMenu
										? "fill-iris"
										: "fill-black opacity-30"
								}`}
							/>
						)}
						{menu.key === "item" && (
							<BucketIcon
								className={`h-[1.75rem] w-[1.625rem] ${
									menu.key === selectedMenu
										? "fill-iris"
										: "fill-black opacity-30"
								}`}
							/>
						)}
						{menu.key === "post" && (
							<ClipIcon
								className={`h-[1.75rem] w-[1.625rem] ${
									menu.key === selectedMenu
										? "fill-iris"
										: "fill-black opacity-30"
								}`}
							/>
						)}
						<p
							className={`${
								menu.key === selectedMenu
									? "font-bold text-iris"
									: "text-black-300"
							} mt-[0.375rem] text-[0.75rem]`}
						>
							{menu.name}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Menu;

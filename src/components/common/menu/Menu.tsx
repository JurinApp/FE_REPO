import BucketIcon from "@assets/svg/bucketIcon.svg?react";
import ClipIcon from "@assets/svg/clipSvg.svg?react";
import TradeIcon from "@assets/svg/tradeIcon.svg?react";
import UserIcon from "@assets/svg/userIcon.svg?react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

	const onClickMenuHandler = (menu: IMenu) => {
		setSelectedMenu(menu.key);
		navigate(menu.path);
	};

	useEffect(() => {
		const path = location.pathname;

		if (path === "/manageLearner") {
			setSelectedMenu("manageLearner");
		}
		if (
			path === "/trade/home" ||
			path === "/trade/todayTrade" ||
			path === "/trade/myStock"
		) {
			setSelectedMenu("trade");
		}
		if (path === "/item") {
			setSelectedMenu("item");
		}
		if (path === "/post") {
			setSelectedMenu("post");
		}
	}, []);

	return (
		<div className="sticky bottom-0 z-[99] mx-auto h-[4.188rem] w-full bg-white px-6 py-[0.5rem] sm:w-[24.563rem]">
			<div className="flex items-center justify-between">
				{menuArr.map((menu: IMenu) => (
					<div
						key={menu.key}
						className="flex flex-col items-center"
						onClick={() => onClickMenuHandler(menu)}
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

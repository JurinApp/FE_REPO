import { selectedTabState } from "@/states/selectedTabState/selectedTabState";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

interface ITabs {
	readonly key: string;
	readonly name: string;
	readonly path: string;
}

const TABS = [
	{ key: "studentItemHome", name: "홈", path: "/studentItem" },
	{ key: "studentMyItem", name: "나의 아이템", path: "/studentItem/myItem" },
];

const StudentItemTab = () => {
	const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState);
	const navigate = useNavigate();
	const location = useLocation();

	const clickTabHandler = (tab: ITabs) => {
		setSelectedTab(tab.key);
		navigate(tab.path);
	};

	useEffect(() => {
		const path = location.pathname;

		if (path === "/studentItem") {
			setSelectedTab("studentItemHome");
		}
		if (path === "/studentItem/myItem") {
			setSelectedTab("studentMyItem");
		}
	}, [location]);

	useEffect(() => {
		return () => {
			setSelectedTab(TABS[0].key);
		};
	}, []);

	return (
		<div className="mx-auto grid w-full grid-cols-2 bg-white sm:w-[24.536rem]">
			{TABS.map((tab) => (
				<div
					key={tab.key}
					className={`flex h-[3.563rem] items-center justify-center text-lg ${
						selectedTab === tab.key
							? "border-b-2 border-black-800 font-bold"
							: "text-black-700"
					}`}
					onClick={() => clickTabHandler(tab)}
				>
					{tab.name}
				</div>
			))}
		</div>
	);
};

export default StudentItemTab;

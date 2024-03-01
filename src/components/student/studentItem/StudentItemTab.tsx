import { selectedStudentItemTabState } from "@/states/selectedTabState/selectedStudentItemTabState";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";

interface ITabs {
	readonly key: string;
	readonly name: string;
	readonly path: string;
}

const TABS = [
	{ key: "studentItemHome", name: "홈", path: "/student/item" },
	{
		key: "studentMyItem",
		name: "나의 아이템",
		path: "/student/myItem",
	},
];

const StudentItemTab = () => {
	const [selectedStudentItemTab, setSelectedStudentItemTab] = useRecoilState(
		selectedStudentItemTabState,
	);
	const resetSelectedStudentItemTab = useResetRecoilState(
		selectedStudentItemTabState,
	);
	const navigate = useNavigate();
	const location = useLocation();
	const channelId = location.pathname.substring(1, 2);

	const clickTabHandler = (tab: ITabs) => {
		setSelectedStudentItemTab(tab.key);
		const path = `/${channelId}${tab.path}`;
		navigate(path);
	};

	useEffect(() => {
		const path = location.pathname;

		if (path === "/studentItem") {
			setSelectedStudentItemTab("studentItemHome");
		}
		if (path === "/studentItem/myItem") {
			setSelectedStudentItemTab("studentMyItem");
		}
	}, [location]);

	useEffect(() => {
		return () => {
			resetSelectedStudentItemTab();
		};
	}, []);

	return (
		<div className="mx-auto w-full bg-white sm:w-[24.536rem]">
			<ul className="grid grid-cols-2">
				{TABS.map((tab) => (
					<li
						key={tab.key}
						className={`flex h-[3.563rem] cursor-pointer items-center justify-center text-lg ${
							selectedStudentItemTab === tab.key
								? "border-b-2 border-black-800 font-bold"
								: "text-black-700"
						}`}
						onClick={() => clickTabHandler(tab)}
					>
						{tab.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default StudentItemTab;

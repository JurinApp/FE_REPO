import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
	const [selectedItemTab, setSelectedItemTab] = useState<string>(TABS[0].key);
	const navigate = useNavigate();

	const clickTabHandler = (tab: ITabs) => {
		const channelId = location.pathname.substring(1, 2);
		setSelectedItemTab(tab.key);
		const path = `/${channelId}${tab.path}`;
		navigate(path);
	};

	return (
		<div className="mx-auto w-full bg-white sm:w-[24.536rem]">
			<ul className="grid grid-cols-2">
				{TABS.map((tab) => (
					<li
						key={tab.key}
						className={`flex h-[3.563rem] cursor-pointer items-center justify-center text-lg ${
							selectedItemTab === tab.key
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

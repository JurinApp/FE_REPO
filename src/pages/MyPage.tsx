import { useSetRecoilState } from "recoil";
import { headerState } from "@/states/headerState";
import { useLayoutEffect } from "react";
import { UserinfoContainer } from "@/components/userinfo/UserinfoContainer";

type TUser = {
	name: string;
	school: string;
	authority: string;
};
const MyPage = () => {
	let sampleData: TUser = {
		name: "홍길동",
		school: "홍길초등학교",
		authority: "선생님",
	};

	const setIsUseHeader = useSetRecoilState(headerState);

	useLayoutEffect(() => {
		setIsUseHeader(true);
	}, []);

	return (
		<div>
			<UserinfoContainer />
		</div>
	);
};

export default MyPage;

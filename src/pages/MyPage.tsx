import { useSetRecoilState } from "recoil";
import { useLayoutEffect } from "react";
import { UserinfoContainer } from "@/components/userinfo/UserinfoContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";

type TUser = {
	name: string;
	school: string;
	authority: string;
};
const MyPage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);

	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: true,
			isUseMenu: false,
		});
	}, []);

	return (
		<div>
			<UserinfoContainer />
		</div>
	);
};

export default MyPage;

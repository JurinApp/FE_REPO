import CreateChannelContainer from "@/components/myPage/channel/CreateChannelContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const CreateChannelPage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);

	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: true,
			isUseMenu: false,
			isUseTab: false,
			isUseItemTab: false,
		});
	}, []);
	return (
		<div>
			<CreateChannelContainer />
		</div>
	);
};

export default CreateChannelPage;

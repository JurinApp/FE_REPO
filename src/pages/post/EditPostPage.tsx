import EditPostContainer from "@/components/post/editPost/EditPostContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const EditPostPage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);

	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: false,
			isUseMenu: true,
			isUseTab: false,
			isUseItemTab: false,
		});
	}, []);

	return (
		<>
			<EditPostContainer />
		</>
	);
};

export default EditPostPage;

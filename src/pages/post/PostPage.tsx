import PostContainer from "@/components/post/inquiryPost/PostContainer";
import { headerMenuUseState } from "@/states/headerMenuUseState";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

const PostPage = () => {
	const setIsUseHeader = useSetRecoilState(headerMenuUseState);

	useLayoutEffect(() => {
		setIsUseHeader({
			isUseHeader: true,
			isUseMenu: true,
			isUseTab: false,
		});
	}, []);

	return (
		<>
			<PostContainer />
		</>
	);
};

export default PostPage;

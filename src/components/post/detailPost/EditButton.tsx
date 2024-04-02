import { userRoleState } from "@/states/userRoleState";
import Edit from "@assets/svg/btn_edit.svg?react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";

const EditButton = () => {
	const { channelId, postId } = useParams();
	const userRole = useRecoilValue(userRoleState);

	return (
		<Link
			to={`/${channelId}/post/edit/${postId}`}
			className={`${
				userRole === "student" ? "hidden" : "block"
			} my-1 flex flex-row-reverse px-4 sm:my-[0.875rem]`}
		>
			<Edit />
		</Link>
	);
};

export default EditButton;

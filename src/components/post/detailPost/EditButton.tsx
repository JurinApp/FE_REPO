import { userRoleState } from "@/states/userRoleState";
import Edit from "@assets/svg/btn_edit.svg?react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

const EditButton = () => {
	const userRole = useRecoilValue(userRoleState);

	return (
		<Link
			to={`/post/edit/1`}
			className={`${
				userRole === "student" ? "hidden" : "block"
			} my-1 flex flex-row-reverse px-4 sm:my-[0.875rem]`}
		>
			<Edit />
		</Link>
	);
};

export default EditButton;

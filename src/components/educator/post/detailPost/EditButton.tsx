import { Link } from "react-router-dom";
import Edit from "@assets/svg/btn_edit.svg?react";
import DetailPostInfo from "./DetailPostInfo";
import DeletePostButton from "./DeletePostButton";

const EditButton = () => {
	return (
		<div className="h-[calc(100vh-8rem)]">
			<Link
				to={`/post/edit/1`}
				className="my-1 flex flex-row-reverse px-4 sm:my-[0.875rem]"
			>
				<Edit />
			</Link>
			<DetailPostInfo />
			<DeletePostButton />
		</div>
	);
};

export default EditButton;

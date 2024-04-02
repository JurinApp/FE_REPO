import { Link, useParams } from "react-router-dom";
import Edit from "@assets/svg/btn_edit.svg?react";

const EditButton = () => {
	const { channelId, itemId } = useParams();

	return (
		<div>
			<Link
				to={`/${channelId}/item/edit/${itemId}`}
				className="my-1 flex flex-row-reverse px-4 sm:my-[0.875rem]"
			>
				<Edit />
			</Link>
		</div>
	);
};

export default EditButton;

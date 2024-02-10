import Edit from "@assets/svg/btn_edit.svg?react";
import { Link, useParams } from "react-router-dom";

const EditButton = () => {
	const { channelId, stockId } = useParams();

	return (
		<div>
			<Link
				to={`/${channelId}/trade/stock/edit/${stockId}`}
				className="my-1 flex flex-row-reverse px-4 sm:my-[0.875rem]"
			>
				<Edit />
			</Link>
		</div>
	);
};

export default EditButton;

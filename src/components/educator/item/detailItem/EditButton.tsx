import { Link } from "react-router-dom";
import Edit from "@assets/svg/btn_edit.svg?react";
import DetailItemInfo from "./DetailItemInfo";
import DeleteButton from "./DeleteButton";

const EditButton = () => {
	return (
		<div className="h-[calc(100vh-8rem)]">
			<div className="my-1 flex flex-row-reverse px-4 sm:my-[0.875rem]">
				<Link to={"/item/edit/1"}>
					<Edit />
				</Link>
			</div>
			<DetailItemInfo />
			<DeleteButton />
		</div>
	);
};

export default EditButton;

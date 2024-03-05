import { Link } from "react-router-dom";
import EditBtn from "@assets/svg/btn_edit.svg?react";

const ModifyBtn = () => {
	return (
		<div className="mr-4 flex justify-end">
			<Link to="/modifyUserinfo">
				<EditBtn />
			</Link>
		</div>
	);
};

export default ModifyBtn;

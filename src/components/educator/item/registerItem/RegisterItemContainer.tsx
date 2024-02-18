import { useParams } from "react-router-dom";
import GoBackButton from "../../../common/GoBackButton/GoBackButton";
import RegisterItemConfirmModal from "./RegisterItemConfirmModal";
import RegisterItemForm from "./RegisterItemForm";

const RegisterItemContainer = () => {
	const { channelId } = useParams();

	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton backNavigationPath={`/${channelId}/item`} />
			<RegisterItemForm />
			<RegisterItemConfirmModal />
		</div>
	);
};

export default RegisterItemContainer;

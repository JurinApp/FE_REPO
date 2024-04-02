import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import EditConfirmItemModal from "./EditConfirmItemModal";
import EditItemForm from "./EditItemForm";
import { useParams } from "react-router-dom";

const EditItemContainer = () => {
	const { channelId, itemId } = useParams();

	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton
				backNavigationPath={`/${channelId}/item/detail/${itemId}`}
			/>
			<EditItemForm />
			<EditConfirmItemModal />
		</div>
	);
};

export default EditItemContainer;

import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import EditConfirmPostModal from "./EditConfirmPostModal";
import EditPostForm from "./EditPostForm";
import { useState } from "react";
import { useParams } from "react-router-dom";

const EditPostContainer = () => {
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const { channelId, postId } = useParams();

	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton
				backNavigationPath={`/${channelId}/post/detail/${postId}`}
			/>
			<EditPostForm isEdit={isEdit} />
			<EditConfirmPostModal setIsEdit={setIsEdit} />
		</div>
	);
};

export default EditPostContainer;

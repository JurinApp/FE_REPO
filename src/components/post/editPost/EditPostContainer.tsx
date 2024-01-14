import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import EditPostForm from "./EditPostForm";
import { useRecoilValue } from "recoil";
import { editPostModalState } from "@/states/confirmModalState";
import EditConfirmPostModal from "./EditConfirmPostModal";

const EditPostContainer = () => {
	const isOpenEditPostModal = useRecoilValue(editPostModalState);

	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton />
			<EditPostForm />
			{isOpenEditPostModal && <EditConfirmPostModal />}
		</div>
	);
};

export default EditPostContainer;

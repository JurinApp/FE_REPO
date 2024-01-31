import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import DeleteDetailPostModal from "./DeleteDetailPostModal";
import EditButton from "./EditButton";

const DetailPostContainer = () => {
	return (
		<div className="relative mx-auto w-full bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<GoBackButton />
			<EditButton />
			<DeleteDetailPostModal />
		</div>
	);
};

export default DetailPostContainer;

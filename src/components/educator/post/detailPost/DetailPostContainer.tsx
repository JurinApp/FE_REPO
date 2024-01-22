import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import DetailPostInfo from "./DetailPostInfo";
import { Link } from "react-router-dom";
import Edit from "@assets/svg/btn_edit.svg?react";
import DeletePostButton from "./DeletePostButton";
import { useRecoilValue } from "recoil";
import { deleteDetailPostModalState } from "@/states/confirmModalState";
import DeleteDetailPostModal from "./DeleteDetailPostModal";

const DetailPostContainer = () => {
	const isOpenDeleteDetailPostModal = useRecoilValue(
		deleteDetailPostModalState,
	);

	return (
		<div className="relative mx-auto w-full bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<GoBackButton />
			<div className="h-[calc(100vh-8rem)]">
				<Link
					to={`/post/edit/1`}
					className="my-[0.875rem] flex flex-row-reverse px-4"
				>
					<Edit />
				</Link>
				<DetailPostInfo />
				<DeletePostButton />
			</div>
			{isOpenDeleteDetailPostModal && <DeleteDetailPostModal />}
		</div>
	);
};

export default DetailPostContainer;

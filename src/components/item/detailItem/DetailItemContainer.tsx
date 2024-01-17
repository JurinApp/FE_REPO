import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import Edit from "@assets/svg/btn_edit.svg?react";
import DetailItemInfo from "./DetailItemInfo";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";
import { useRecoilValue } from "recoil";
import { deleteDetailItemModalState } from "@/states/confirmModalState";
import DeleteDetailItemModal from "./DeleteDetailItemModal";

const DetailItemContainer = () => {
	const isOpenDeleteDetailItemModal = useRecoilValue(
		deleteDetailItemModalState,
	);

	return (
		<div className="relative mx-auto w-full bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<GoBackButton />
			<div className="h-[calc(100vh-8rem)]">
				<div className="my-[0.875rem] flex flex-row-reverse px-4">
					<Link to={"/item/edit/1"}>
						<Edit />
					</Link>
				</div>
				<DetailItemInfo />
				<DeleteButton />
			</div>
			{isOpenDeleteDetailItemModal && <DeleteDetailItemModal />}
		</div>
	);
};

export default DetailItemContainer;

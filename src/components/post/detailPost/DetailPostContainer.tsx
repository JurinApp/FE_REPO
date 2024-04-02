import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import DeleteDetailPostModal from "./DeleteDetailPostModal";
import DetailPostInfoSection from "./DetailPostInfoSection";
import { useParams } from "react-router-dom";

const DetailPostContainer = () => {
	const { channelId } = useParams();

	return (
		<div className="relative mx-auto w-full bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<GoBackButton backNavigationPath={`/${channelId}/post`} />
			<DetailPostInfoSection />
			<DeleteDetailPostModal />
		</div>
	);
};

export default DetailPostContainer;

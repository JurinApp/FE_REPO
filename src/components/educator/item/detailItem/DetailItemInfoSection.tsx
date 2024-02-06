import DetailItemInfo from "./DetailItemInfo";
import DeleteButton from "./DeleteButton";

const DetailItemInfoSection = () => {
	return (
		<div className="h-[calc(100vh-8rem)]">
			<DetailItemInfo />
			<DeleteButton />
		</div>
	);
};

export default DetailItemInfoSection;

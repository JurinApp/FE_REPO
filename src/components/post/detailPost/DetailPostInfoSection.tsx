import DeletePostButton from "./DeletePostButton";
import DetailPostInfo from "./DetailPostInfo";
import EditButton from "./EditButton";

const DetailPostInfoSection = () => {
	return (
		<div className="h-[calc(100vh-8rem)]">
			<EditButton />
			<DetailPostInfo />
			<DeletePostButton />
		</div>
	);
};

export default DetailPostInfoSection;

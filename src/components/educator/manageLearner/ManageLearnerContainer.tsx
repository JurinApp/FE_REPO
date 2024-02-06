import Spinner from "@/components/common/spinner/Spinner";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DeleteLearnerButton from "./DeleteLearnerAndPointButton";
import LearnerList from "./LearnerList";
import LearnerSearch from "./LearnerSearch";
import ManageLearnerHeadingTitle from "./ManageLearnerHeadingTitle";
import DeleteLearnerModal from "./modal/DeleteLearnerModal";
import PaymentPointModal from "./modal/PaymentPointModal";

const ManageLearnerContainer = () => {
	const { axiosData } = useAxios();
	const { channelId } = useParams();
	const [searchKeyword, setSearchKeyword] = useState<string>("");

	const getLearnersData = async () => {
		const apiUrl =
			searchKeyword.length === 0
				? `/teachers/api/v1/channels/${channelId}/management`
				: `/teachers/api/v1/channels/1/management?nickname=${searchKeyword}`;

		const response = await axiosData("useToken", {
			method: "GET",
			url: apiUrl,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data.data.users;
			}
		}
	};

	const { data, isLoading } = useQuery({
		queryKey: ["learnerList", channelId, searchKeyword],
		queryFn: getLearnersData,
	});

	return (
		<div className="relative mx-auto h-body-height w-full bg-btn-cancel-tekhelet px-4 sm:w-[24.563rem]">
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<ManageLearnerHeadingTitle learnerList={data} />
					<LearnerSearch
						searchKeyword={searchKeyword}
						setSearchKeyword={setSearchKeyword}
					/>
					<LearnerList learnerList={data} />
					<DeleteLearnerButton />
					<DeleteLearnerModal />
					<PaymentPointModal />
				</>
			)}
		</div>
	);
};

export default ManageLearnerContainer;

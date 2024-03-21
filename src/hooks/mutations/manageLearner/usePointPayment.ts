import useAxios from "@/hooks/useAxios";
import { selectedLearner } from "@/states/selectedState/selectedLearnerState";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

const usePointPayment = () => {
	const [selectedLearners, setSelectedLearners] =
		useRecoilState(selectedLearner);
	const { axiosData } = useAxios();
	const { channelId } = useParams();

	const submitPaymentPoint = async (point: number) => {
		const response = await axiosData("useToken", {
			method: "POST",
			url: `/teachers/api/v1/channels/${channelId}/management`,
			data: {
				userIds: selectedLearners,
				point: point,
			},
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				alert("포인트 지급이 완료 되었습니다.");
				setSelectedLearners([]);
			} else {
				alert("포인트 지급에 실패하였습니다. 잠시 후에 다시 시도해주세요");
			}
		}
	};

	return useMutation({ mutationFn: submitPaymentPoint });
};

export default usePointPayment;

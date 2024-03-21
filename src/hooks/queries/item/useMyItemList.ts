import useAxios from "@/hooks/useAxios";
import { myItemFilterState } from "@/states/filterState/myItemFilterState";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

interface IApiUrl {
	[key: string]: string;
}

const useMyItemList = () => {
	const filterState = useRecoilValue(myItemFilterState);
	const { channelId } = useParams();
	const { axiosData } = useAxios();

	const getMyItemList = async () => {
		const apiUrl: IApiUrl = {
			all: `/students/api/v1/channels/${channelId}/items/mine`,
			available: `/students/api/v1/channels/${channelId}/items/mine?is_used=false`,
			used: `/students/api/v1/channels/${channelId}/items/mine?is_used=true`,
		};

		const response = await axiosData("useToken", {
			method: "GET",
			url: apiUrl[filterState],
		});

		console.log(response?.data.data);

		return response?.data.data;
	};

	return useQuery({
		queryKey: ["studentItem", "myItem", channelId, filterState],
		queryFn: getMyItemList,
	});
};

export default useMyItemList;

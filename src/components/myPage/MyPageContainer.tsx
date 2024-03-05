import useUserInfo from "@/hooks/queries/myPage/useUserInfo";
import { useMemo } from "react";
import Spinner from "../common/spinner/Spinner";
import { EnterChannelModal } from "./channel/EnterChannelModal";
import ModifyBtn from "./userAndChannelInfo/ModifyBtn";
import UserAndChannelInfoSection from "./userAndChannelInfo/UserAndChannelInfoSection";

const MyPageContainer = () => {
	const queries = useUserInfo();

	const isLoading = useMemo(() => {
		return queries.some((query) => query.isLoading);
	}, [queries]);

	return (
		<div className="mx-auto flex h-[calc(100vh-2.938rem)] flex-col justify-end gap-4 bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<ModifyBtn />
			{isLoading ? (
				<Spinner />
			) : (
				<UserAndChannelInfoSection
					userInfo={queries[0].data}
					channel={queries[1].data}
				/>
			)}
			<EnterChannelModal />
		</div>
	);
};

export default MyPageContainer;

import useUserInfo from "@/hooks/queries/myPage/useUserInfo";
import ModifyUserInfo from "./ModifyUserInfo";
import { useMemo } from "react";
import Spinner from "@/components/common/spinner/Spinner";
import GoBackButton from "@/components/common/GoBackButton/GoBackButton";

const ModifyInfoContainer = () => {
	const queries = useUserInfo();

	const isLoading = useMemo(() => {
		return queries.some((query) => query.isLoading);
	}, [queries]);

	return (
		<div className="mx-auto flex h-screen flex-col justify-between sm:w-[24.563rem]">
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<GoBackButton backNavigationPath={"/mypage"} />
					<ModifyUserInfo
						userInfo={queries[0].data}
						channel={queries[1].data}
					/>
				</>
			)}
		</div>
	);
};

export default ModifyInfoContainer;

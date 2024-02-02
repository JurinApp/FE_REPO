import { EnterChannelModal } from "../channel/EnterChannelModal";
import MoveModifyBtn from "./MoveModifyBtn";
import UserinfoSection from "./UserinfoSection";

interface IUser {
	readonly name: string;
	readonly school: string;
	readonly authority: string;
}

interface IChannelInfo {
	readonly name: string;
	readonly code: string;
}

export const SAMPLE_DATA: IUser = {
	name: "홍길동",
	school: "홍길초등학교",
	authority: "선생님",
};

export const SAMPLE_CHANNEL: IChannelInfo = {
	name: "1-A반",
	code: "1A2B3C4D",
};
export const UserinfoContainer = () => {
	return (
		<div className="mx-auto flex h-[calc(100vh-2.938rem)] flex-col justify-end gap-4 bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<MoveModifyBtn />
			<UserinfoSection />
			<EnterChannelModal />
		</div>
	);
};

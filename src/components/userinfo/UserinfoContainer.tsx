import { Link } from "react-router-dom";
import EditBtn from "../../assets/svg/btn_edit.svg?react";
import { useRecoilValue } from "recoil";
import { userinfoState } from "@/states/userinfoState";
import { useState } from "react";
import { EnterChannelModal } from "../channel/EnterChannelModal";

type TUser = {
	name: string;
	school: string;
	authority: string;
};

type TChannelInfo = {
	name: string;
	code: string;
};
export const UserinfoContainer = () => {
	const authState = useRecoilValue(userinfoState);
	const curAuthName = authState.curAuth === "teacher" ? "선생님" : "학생";
	let sampleData: TUser = {
		name: "홍길동",
		school: "홍길초등학교",
		authority: "선생님",
	};
	let channelInfo: TChannelInfo = {
		name: "1-A반",
		code: "1A2B3C4D",
	};
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const handleConfirm = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<div className="mx-auto h-[50.312rem] w-[393px] bg-[#3d348b] bg-opacity-5">
			<div className="flex h-[50.312rem] flex-col justify-end gap-4">
				<div className="mr-4 flex justify-end">
					<Link to="/modifyUserinfo">
						<EditBtn />
					</Link>
				</div>
				<div
					className="ml-4 flex h-[8.5rem] w-[361px] flex-col justify-center rounded border border-black border-opacity-10 bg-[#ffffff] "
					id="userinfoSection"
				>
					<div className="my-2 ml-4 flex items-center gap-4">
						<label className="text-black text-opacity-80" htmlFor="name">
							이름
						</label>
						<p className="font-medium">{curAuthName}</p>
					</div>
					<div className="my-2 ml-4 flex gap-4">
						<label className="text-black text-opacity-80" htmlFor="school">
							학교
						</label>
						<p className="font-medium">{sampleData.school}</p>
					</div>
					<div className="my-2 ml-4 flex gap-4">
						<label className="text-black text-opacity-80" htmlFor="authority">
							권한
						</label>
						<p className="font-medium">{sampleData.authority}</p>
					</div>
				</div>
				{channelInfo ? (
					<div
						className="ml-4 flex h-[6.375rem] w-[361px] flex-col  justify-center rounded border border-black border-opacity-10 bg-[#ffffff] "
						id="channelSection"
					>
						<div className="my-2 ml-4 flex gap-4">
							<label className="text-black text-opacity-80" htmlFor="school">
								학교
							</label>
							<p className="font-medium">{sampleData.school}</p>
						</div>
						<div className="my-2 ml-4 flex gap-4">
							<label className="text-black text-opacity-80" htmlFor="authority">
								권한
							</label>
							<p className="font-medium">{sampleData.authority}</p>
						</div>
					</div>
				) : (
					<div
						className="ml-4 flex h-[6.375rem] w-[361px] flex-col items-center justify-center rounded border border-black-100 bg-black-100"
						id="channelSection"
					>
						<p className="font-medium">채널 정보가 존재하지 않습니다.</p>
					</div>
				)}
				{curAuthName === "선생님" ? (
					<Link to="/createChannel">
						<button
							className="mb-8 ml-4 flex h-[3.188rem] w-[361px] items-center justify-center rounded bg-[#3d348b]"
							id="button"
						>
							<p className="font-medium text-white">채널 생성</p>
						</button>
					</Link>
				) : (
					<button
						className="mb-8 ml-4 flex h-[3.188rem] w-[361px] items-center justify-center rounded bg-[#3d348b]"
						id="button"
						onClick={() => setIsModalOpen(true)}
					>
						<p className="font-medium text-white">채널 입장</p>
					</button>
				)}
				<EnterChannelModal
					isOpen={isModalOpen}
					onConfirm={handleConfirm}
					onCancel={handleCancel}
				/>
			</div>
		</div>
	);
};

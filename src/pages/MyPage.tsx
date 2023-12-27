import { Link } from "react-router-dom";
import EditBtn from "../assets/svg/btn_edit.svg?react";

type TUser = {
	name: string;
	school: string;
	authority: string;
};
const MyPage = () => {
	let sampleData: TUser = {
		name: "홍길동",
		school: "홍길초등학교",
		authority: "선생님",
	};
	// mypage 로직
	// 로그인을 하면 mypage로 이동.

	// 1. 개인 정보 세션 (공통)
	// user = {name: string; school: string; authority: string;}

	// 2. 채널 정보 세션

	// 2-1. 선생님
	// 채널 정보가 없는 경우, 채널 정보가 존재하지 않습니다. 라는 문구가 표시되고, 채널 생성 버튼 존재
	// 채널 생성 버튼 누르면, CreateChannelPage로 이동.

	// 채널 정보가 있는 경우
	// channelInfo = {name: stirng; code: string;}
	// 채널 입장 버튼 존재

	// 2-2. 학생
	// 채널 정보가 없는 경우, 채널 정보가 존재하지 않습니다. 라는 문구가 표시되고, 채널 참여 버튼 존재
	// 채널 참여 버튼 누르면, 참여 코드 등록 모달 표시.
	// 유효한 채널 코드 입력 시, api 호출 응답값으로 mypage에 채널 정보 표시.
	// 유효하지 않은 채널 코드 입력 시, api 호출 응답 결과로 유효하지 않다는 것을 표시. (이 부분은 ui 구현 필요)

	return (
		<div className="mx-auto h-[852px] w-[393px] bg-[#3d348b] bg-opacity-5">
			<div className="flex h-[852px] flex-col justify-end gap-4">
				<div className="mr-4 flex justify-end">
					<Link to="/modifyUserinfo">
						<EditBtn />
					</Link>
				</div>
				<div
					className="ml-4 flex h-[136px] w-[361px] flex-col justify-center rounded border border-black border-opacity-10 bg-[#ffffff] "
					id="userinfoSection"
				>
					<div className="my-2 ml-4 flex items-center gap-4">
						<label className="text-black text-opacity-80" htmlFor="name">
							이름
						</label>
						<p className="font-[500]">{sampleData.name}</p>
					</div>
					<div className="my-2 ml-4 flex gap-4">
						<label className="text-black text-opacity-80" htmlFor="school">
							학교
						</label>
						<p className="font-[500]">{sampleData.school}</p>
					</div>
					<div className="my-2 ml-4 flex gap-4">
						<label className="text-black text-opacity-80" htmlFor="authority">
							권한
						</label>
						<p className="font-[500]">{sampleData.authority}</p>
					</div>
				</div>
				<div
					className="ml-4 flex h-[102px] w-[361px] flex-col items-center justify-center rounded border border-black border-opacity-10 bg-[#000000] bg-opacity-10"
					id="channelSection"
				>
					<p className="font-[500]">채널 정보가 존재하지 않습니다.</p>
				</div>
				<Link to="/createChannel">
					<button
						className="mb-8 ml-4 flex h-[51px] w-[361px] items-center justify-center rounded bg-[#3d348b]"
						id="button"
					>
						<p className="font-[500] text-white">채널 생성</p>
					</button>
				</Link>
			</div>
		</div>
	);
};

export default MyPage;

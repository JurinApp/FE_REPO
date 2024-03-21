import { IUser } from "@/interface/userAndChannelInfo";

interface IUserInfoProps {
	readonly userInfo: IUser;
}

const UserInfo = ({ userInfo }: IUserInfoProps) => {
	return (
		<div className="mx-auto mb-4 flex h-[8.5rem] w-full flex-col justify-center rounded border border-black border-opacity-10 bg-white sm:w-[22.563rem] sm:px-0 ">
			<div className="my-2 ml-4 flex items-center gap-4">
				<label className="text-black text-opacity-80" htmlFor="name">
					이름
				</label>
				<p className="font-medium">{userInfo.user.nickname}</p>
			</div>
			<div className="my-2 ml-4 flex gap-4">
				<label className="text-black text-opacity-80" htmlFor="school">
					학교
				</label>
				<p className="font-medium">{userInfo.user.schoolName}</p>
			</div>
			<div className="my-2 ml-4 flex gap-4">
				<label className="text-black text-opacity-80" htmlFor="authority">
					권한
				</label>
				<p className="font-medium">
					{userInfo.user.userRole === "teacher" ? "선생님" : "학생"}
				</p>
			</div>
		</div>
	);
};

export default UserInfo;

import { Link } from "react-router-dom";

const SuccessSignUp = () => {
	return (
		<div className="relative mx-auto flex h-[calc(100vh-3rem)] w-full flex-col items-center justify-center bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<p className="text-center text-[1.375rem] font-medium text-black-800">
				회원가입이 완료되었습니다!
			</p>
			<Link
				to="/login"
				className="absolute bottom-10 flex h-box-height items-center justify-center rounded-[0.25rem] bg-tekhelet font-bold text-white sm:w-box-width"
			>
				로그인 하러가기
			</Link>
		</div>
	);
};
export default SuccessSignUp;

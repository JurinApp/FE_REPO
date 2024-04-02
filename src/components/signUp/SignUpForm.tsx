import { SIGN_UP_SCHEMA } from "@/constants/formSchema";
import useSignUpValidate from "@/hooks/useSignUpDuplication";
import { signUpConfirmModalState } from "@/states/modalState/signUpConfirmModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import ErrorMsg from "../common/errorMsg/ErrorMsg";
import Spinner from "../common/spinner/Spinner";
import SuccessMsg from "../common/successMsg/SuccessMsg";
import SignUpConfirmModal from "./SignUpConfirmModal";

interface IFormData {
	readonly username: string;
	readonly nickname: string;
	readonly password: string;
	readonly userRole: number;
	verificationCode?: string;
}

const SignUpForm = () => {
	const [confirmModalState, setConfirmModalState] = useRecoilState(
		signUpConfirmModalState,
	);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		watch,
		getValues,
		clearErrors,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			id: "",
			password: "",
			checkPassword: "",
			name: "",
			auth: "1",
		},
		resolver: yupResolver(SIGN_UP_SCHEMA),
		mode: "onChange",
	});
	const [isSignUp, setIsSignUp] = useState<boolean>(false);
	const {
		handleIdDuplicate,
		handleCodeDuplicateCheck,
		code,
		codeError,
		onChangeCodeHandler,
		idDuplication,
		codeDuplication,
		codeRef,
		axiosData,
		isFetchLoading,
	} = useSignUpValidate({
		getValues,
		watch,
		setError,
		clearErrors,
		setConfirmModalState,
	});

	const isFormValidate =
		!isValid ||
		!idDuplication.isIdDuplicateCheck ||
		!codeDuplication.isCodeDuplicateCheck;

	const handleSubmitSignUp = async () => {
		if (!isSignUp) return;

		let formData: IFormData =
			Number(getValues().auth) === 1
				? {
						username: getValues().id,
						nickname: getValues().name,
						password: getValues().password,
						userRole: Number(getValues().auth),
						verificationCode: code,
					}
				: {
						username: getValues().id,
						nickname: getValues().name,
						password: getValues().password,
						userRole: Number(getValues().auth),
					};

		const response = await axiosData("default", {
			method: "POST",
			url: "/api/v1/auth/signup",
			data: formData,
		});

		if (response) {
			const status = response.status;
			setIsSignUp(false);

			if (status === 200) {
				navigate("/successSignUp");
			}

			if (status === 400) {
				alert("회원가입 형식에 맞게 작성해주세요.");
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
			}
		}
	};

	const handleClickSignUpBtn = () => {
		setConfirmModalState((prevState) => ({
			...prevState,
			isModalOpen: true,
		}));
	};

	useEffect(() => {
		if (isSignUp) {
			handleSubmitSignUp();
		}
	}, [isSignUp]);

	return (
		<>
			<div className="mt-6">
				<h1 className="text-[1.625rem] font-bold">회원가입</h1>
				<form onSubmit={handleSubmit(handleClickSignUpBtn)} className="mt-6 ">
					<div className="flex flex-col">
						<label htmlFor="id" className="mb-1 font-bold text-black-800">
							아이디
						</label>
						<div
							className={`flex items-center ${
								(errors.id || idDuplication.isIdDuplicateCheck) && "mb-3"
							}`}
						>
							<input
								id="id"
								type="text"
								maxLength={12}
								className={`${
									errors.id
										? "border-danger focus:border-danger"
										: "border-black-100 focus:border-black-800"
								} w-full rounded-none border-b py-[0.875rem] outline-none placeholder:text-black-300`}
								placeholder="아이디"
								{...register("id")}
							/>
							<button
								type="button"
								disabled={idDuplication.isIdBtnDisabled}
								className="ml-[0.813rem] h-12 w-28 rounded bg-black-800 font-medium text-white disabled:bg-black-300"
								onClick={handleIdDuplicate}
							>
								중복확인
							</button>
						</div>
						{errors.id && errors.id.message && (
							<ErrorMsg message={errors.id.message} />
						)}
						{idDuplication.isIdDuplicateCheck && (
							<SuccessMsg message={idDuplication.idDuplicateMsg} />
						)}
					</div>
					<div className="mt-[1.875rem] flex flex-col">
						<label htmlFor="password" className="mb-1 font-bold text-black-800">
							비밀번호
						</label>
						<input
							id="password"
							type="password"
							maxLength={16}
							className={`${
								errors.password
									? "border-danger focus:border-danger"
									: "border-black-100 focus:border-black-800"
							} rounded-none border-b py-[0.875rem] outline-none placeholder:text-black-300 ${
								errors.password ? "mb-3" : "mb-1"
							}`}
							placeholder="비밀번호"
							{...register("password")}
						/>
						{errors.password && errors.password.message && (
							<ErrorMsg message={errors.password.message} />
						)}
						<label htmlFor="checkPassword" className="hidden">
							비밀번호 확인
						</label>
						<input
							id="checkPassword"
							type="password"
							maxLength={16}
							className={`${
								errors.checkPassword
									? "border-danger focus:border-danger"
									: "border-black-100 focus:border-black-800"
							} rounded-none border-b py-[0.875rem] outline-none placeholder:text-black-300 ${
								errors.checkPassword && "mb-3"
							}`}
							placeholder="비밀번호 확인"
							{...register("checkPassword")}
						/>
						{errors.checkPassword && errors.checkPassword.message && (
							<ErrorMsg message={errors.checkPassword.message} />
						)}
					</div>
					<div className="mt-[1.875rem] flex flex-col">
						<label htmlFor="name" className="mb-1 font-bold text-black-800">
							이름
						</label>
						<input
							id="name"
							type="text"
							maxLength={8}
							className={`${
								errors.name
									? "border-danger focus:border-danger"
									: "border-black-100 focus:border-black-800"
							} rounded-none border-b py-[0.875rem] outline-none placeholder:text-black-300 ${
								errors.name && "mb-3"
							}`}
							placeholder="이름"
							{...register("name")}
						/>
						{errors.name && errors.name.message && (
							<ErrorMsg message={errors.name.message} />
						)}
					</div>
					<div className="mt-[1.875rem] flex h-[10.813rem] flex-col">
						<label className="mb-1 font-bold text-black-800">권한</label>
						<div className="mt-2">
							<div className="flex">
								<div className="flex items-center">
									<input
										id="teacher"
										type="radio"
										value="1"
										className="h-6 w-6 cursor-pointer"
										defaultChecked
										{...register("auth")}
									/>
									<label
										htmlFor="teacher"
										className="ml-2 flex h-[3.25rem] cursor-pointer items-center"
									>
										선생님
									</label>
								</div>
								<div className="ml-[3.75rem] flex items-center">
									<input
										id="student"
										type="radio"
										value="2"
										className="h-6 w-6 cursor-pointer"
										{...register("auth")}
									/>
									<label
										htmlFor="student"
										className="ml-2 flex h-[3.25rem] cursor-pointer items-center"
									>
										학생
									</label>
								</div>
							</div>
							{errors.auth && errors.auth.message && (
								<ErrorMsg message={errors.auth.message} />
							)}
						</div>
						<div>
							<div
								className={`${
									watch().auth === "2" ? "hidden" : "flex items-center"
								} ${
									(codeError.isError || codeDuplication.isCodeDuplicateCheck) &&
									"mb-3"
								}`}
							>
								<input
									id="code"
									type="text"
									ref={codeRef}
									maxLength={8}
									disabled={codeDuplication.isCodeDuplicateCheck}
									onChange={onChangeCodeHandler}
									className={`${
										codeError.isError
											? "border-danger focus:border-danger"
											: "border-black-100 focus:border-black-800"
									} w-full rounded-none border-b py-[0.875rem] outline-none placeholder:text-black-300 disabled:text-black-300`}
									placeholder="인증 코드 입력"
								/>
								<button
									type="button"
									disabled={codeDuplication.isCodeBtnDisabled}
									className="ml-[0.813rem] h-12 w-28 rounded bg-black-800 font-medium text-white disabled:bg-black-300"
									onClick={handleCodeDuplicateCheck}
								>
									확인
								</button>
							</div>
							{codeError.isError && codeError.codeErrorMsg && (
								<ErrorMsg message={codeError.codeErrorMsg} />
							)}
							{!codeError.isError && codeDuplication.isCodeDuplicateCheck && (
								<SuccessMsg message={codeDuplication.codeDuplicateMsg} />
							)}
						</div>
					</div>
					<button
						type="submit"
						disabled={isFormValidate}
						className="mb-[2.625rem] mt-[1.5rem] h-[3.25rem] w-full rounded bg-tekhelet font-bold text-white disabled:bg-disabled-tekhelet"
					>
						가입하기
					</button>
				</form>
			</div>
			{confirmModalState.isModalOpen && (
				<SignUpConfirmModal setIsSignUp={setIsSignUp} />
			)}
			{isFetchLoading && <Spinner />}
		</>
	);
};

export default SignUpForm;

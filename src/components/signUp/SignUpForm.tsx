import { SIGN_UP_SCHEMA } from "@/constants/formSchema";
import useAxios from "@/hooks/useAxios";
import useInput from "@/hooks/useInput";
import { signUpConfirmModalState } from "@/states/signUpConfirmModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import ErrorMsg from "../common/errorMsg/ErrorMsg";
import SuccessMsg from "../common/successMsg/SuccessMsg";
import SignUpConfirmModal from "./SignUpConfirmModal";

interface IIdDuplicateCheck {
	readonly isIdDuplicateCheck: boolean;
	readonly idDuplicateMsg: string;
	readonly isIdBtnDisabled: boolean;
}

interface ICodeDuplicateCheck {
	readonly isCodeDuplicateCheck: boolean;
	readonly codeDuplicateMsg: string;
	readonly isCodeBtnDisabled: boolean;
}

interface ICodeError {
	readonly isError: boolean;
	readonly codeErrorMsg: string;
}

const SignUpForm = () => {
	const [confirmModalState, setConfirmModalState] = useRecoilState(
		signUpConfirmModalState,
	);
	const { axiosData } = useAxios();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		watch,
		getValues,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			id: "",
			password: "",
			checkPassword: "",
			name: "",
			auth: "teacher",
		},
		resolver: yupResolver(SIGN_UP_SCHEMA),
		mode: "onChange",
	});
	const [code, onChangeCodeHandler, setCode] = useInput("");
	const codeRef = useRef<HTMLInputElement>(null);
	const [idDuplicateCheck, setIdDuplicateCheck] = useState<IIdDuplicateCheck>({
		isIdDuplicateCheck: false,
		idDuplicateMsg: "",
		isIdBtnDisabled: true,
	});
	const [codeDuplicateCheck, setCodeDuplicateCheck] =
		useState<ICodeDuplicateCheck>({
			isCodeDuplicateCheck: false,
			codeDuplicateMsg: "",
			isCodeBtnDisabled: true,
		});
	const [codeError, setCodeError] = useState<ICodeError>({
		isError: false,
		codeErrorMsg: "",
	});
	const [isSignUp, setIsSignUp] = useState<boolean>(false);

	const signUpSubmitHandler = async () => {
		const response = await axiosData("default", {
			method: "POST",
			url: "/api/api/v1/auth/signup",
			data: {
				username: getValues().id,
				nickname: getValues().name,
				password: getValues().password,
				userRole: getValues().auth,
				verificationCode: code,
			},
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				setIsSignUp(false);
				navigate("/successSignUp");
			}

			if (status === 400) {
				// TODO : 400에러 코드 에러 핸들링 예정
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
			}
		}
	};

	const idDuplicateCheckHandler = async () => {
		const response = await axiosData("default", {
			method: "POST",
			url: "/api/api/v1/auth/validate",
			data: {
				validateValue: getValues().id,
				validateType: "username",
			},
		});

		if (response) {
			const status = response.status;

			if (status === 400) {
				setIdDuplicateCheck({
					isIdDuplicateCheck: false,
					idDuplicateMsg: "사용 불가능한 아이디입니다.",
					isIdBtnDisabled: false,
				});
			}
			if (status === 200) {
				setIdDuplicateCheck({
					isIdDuplicateCheck: true,
					idDuplicateMsg: "사용 가능한 아이디입니다.",
					isIdBtnDisabled: true,
				});
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다 잠시 후에 다시 시도해주세요.");
			}
		}
	};

	const codeDuplicateCheckHandler = async () => {
		const response = await axiosData("default", {
			method: "POST",
			url: "/api/api/v1/auth/validate",
			data: {
				validateValue: code,
				validateType: "verification_code",
			},
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				setCodeDuplicateCheck({
					isCodeDuplicateCheck: true,
					codeDuplicateMsg: "인증이 완료되었습니다.",
					isCodeBtnDisabled: true,
				});
			}
			if (status === 400) {
				setCodeDuplicateCheck({
					isCodeDuplicateCheck: false,
					codeDuplicateMsg: "인증코드가 일치하지 않습니다.",
					isCodeBtnDisabled: false,
				});
			}
		}
	};

	const onClickSignUpBtnHandler = () => {
		setConfirmModalState((prevState) => ({
			...prevState,
			isModalOpen: true,
		}));
	};

	useEffect(() => {
		const auth = watch().auth;

		if (auth === "student") {
			setCodeError({
				isError: false,
				codeErrorMsg: "",
			});
			setCodeDuplicateCheck({
				isCodeDuplicateCheck: true,
				codeDuplicateMsg: "",
				isCodeBtnDisabled: true,
			});
			setCode("");
			if (codeRef.current) {
				codeRef.current.value = "";
			}
		}

		if (auth === "teacher") {
			setCodeDuplicateCheck((prevState) => ({
				...prevState,
				isCodeDuplicateCheck: false,
			}));
		}

		setConfirmModalState((prevState) => ({
			...prevState,
			selectedAuth: auth,
		}));
	}, [watch().auth]);

	useEffect(() => {
		const id = watch().id;

		if (idDuplicateCheck.isIdBtnDisabled && id.length >= 8) {
			setIdDuplicateCheck((prevState) => ({
				...prevState,
				isIdBtnDisabled: false,
			}));
			setError("id", {
				message: "아이디 중복확인을 하세요.",
				type: "onChange",
			});
		}

		if (!idDuplicateCheck.isIdBtnDisabled && id.length < 8) {
			setIdDuplicateCheck((prevState) => ({
				...prevState,
				isIdBtnDisabled: true,
			}));
		}

		if (idDuplicateCheck.isIdDuplicateCheck) {
			const isDisabled = id.length >= 8;

			setIdDuplicateCheck({
				isIdDuplicateCheck: false,
				idDuplicateMsg: "",
				isIdBtnDisabled: isDisabled,
			});
		}
	}, [watch().id]);

	useEffect(() => {
		if (
			watch().auth === "teacher" &&
			codeDuplicateCheck.isCodeBtnDisabled &&
			code.length === 8
		) {
			setCodeDuplicateCheck((prevState) => ({
				...prevState,
				isCodeBtnDisabled: false,
			}));
		} else {
			setCodeDuplicateCheck((prevState) => ({
				...prevState,
				isCodeBtnDisabled: true,
			}));
		}
	}, [code]);

	useEffect(() => {
		if (isSignUp) {
			signUpSubmitHandler();
		}
	}, [isSignUp]);

	return (
		<>
			<div className="mt-6">
				<h1 className="text-[1.625rem] font-bold">회원가입</h1>
				<form onSubmit={handleSubmit(signUpSubmitHandler)} className="mt-6 ">
					<div className="flex flex-col">
						<label htmlFor="id" className="mb-1 font-bold text-black-800">
							아이디
						</label>
						<div
							className={`flex items-center ${
								(errors.id || idDuplicateCheck.isIdDuplicateCheck) && "mb-3"
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
								} grow border-b py-[0.875rem] outline-none placeholder:text-black-300`}
								placeholder="아이디"
								{...register("id")}
							/>
							<button
								type="button"
								disabled={idDuplicateCheck.isIdBtnDisabled}
								className="ml-[0.813rem] h-12 w-28 rounded bg-black-800 font-medium text-white disabled:bg-black-300"
								onClick={idDuplicateCheckHandler}
							>
								중복확인
							</button>
						</div>
						{errors.id && errors.id.message && (
							<ErrorMsg message={errors.id.message} />
						)}
						{idDuplicateCheck.isIdDuplicateCheck && (
							<SuccessMsg message={idDuplicateCheck.idDuplicateMsg} />
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
							} border-b py-[0.875rem] outline-none placeholder:text-black-300 ${
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
							} border-b py-[0.875rem] outline-none placeholder:text-black-300 ${
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
							} border-b py-[0.875rem] outline-none placeholder:text-black-300 ${
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
										value="teacher"
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
										value="student"
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
									watch().auth === "student" ? "hidden" : "flex items-center"
								} ${
									(codeError.isError ||
										codeDuplicateCheck.isCodeDuplicateCheck) &&
									"mb-3"
								}`}
							>
								<input
									id="code"
									type="text"
									ref={codeRef}
									maxLength={8}
									onChange={onChangeCodeHandler}
									className={`${
										codeError.isError
											? "border-danger focus:border-danger"
											: "border-black-100 focus:border-black-800"
									} grow border-b py-[0.875rem] outline-none placeholder:text-black-300`}
									placeholder="인증 코드 입력"
								/>
								<button
									type="button"
									disabled={codeDuplicateCheck.isCodeBtnDisabled}
									className="ml-[0.813rem] h-12 w-28 rounded bg-black-800 font-medium text-white disabled:bg-black-300"
									onClick={codeDuplicateCheckHandler}
								>
									확인
								</button>
							</div>
							{codeError.isError && codeError.codeErrorMsg && (
								<ErrorMsg message={codeError.codeErrorMsg} />
							)}
							{codeDuplicateCheck.isCodeDuplicateCheck && (
								<SuccessMsg message={codeDuplicateCheck.codeDuplicateMsg} />
							)}
						</div>
					</div>
					<button
						type="submit"
						onClick={onClickSignUpBtnHandler}
						disabled={
							!isValid ||
							!idDuplicateCheck.isIdDuplicateCheck ||
							!codeDuplicateCheck.isCodeDuplicateCheck
						}
						className="mb-[2.625rem] mt-[1.5rem] h-[3.25rem] w-full rounded bg-tekhelet font-bold text-white disabled:bg-disabled-tekhelet"
					>
						가입하기
					</button>
				</form>
			</div>
			{confirmModalState.isModalOpen && (
				<SignUpConfirmModal setIsSignUp={setIsSignUp} />
			)}
		</>
	);
};

export default SignUpForm;

import { LOGIN_SCHEMA } from "@/constants/formSchema";
import ErrorMsg from "@components/common/errorMsg/ErrorMsg";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface ILoginFormValues {
	readonly id: string;
	readonly password: string;
}

interface IError {
	readonly isError: boolean;
	readonly errorMsg: string;
}

const LoginFormSection = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { isValid, errors },
	} = useForm({
		defaultValues: {
			id: "",
			password: "",
		},
		resolver: yupResolver(LOGIN_SCHEMA),
		mode: "onChange",
	});

	const [loginError, setLoginError] = useState<IError>({
		isError: false,
		errorMsg: "",
	});

	const validate = (data: ILoginFormValues) => {
		if (data.id.length === 0) {
			return false;
		}

		if (data.password.length === 0) {
			return false;
		}

		return true;
	};

	const submitHandler = (data: ILoginFormValues) => {
		if (!validate(data)) return;

		// 임시 에러, API 만들어지면 로그인 기능 붙일 예정
		setLoginError({
			isError: true,
			errorMsg: "아이디나 비밀번호를 다시 확인해주세요.",
		});
	};

	useEffect(() => {
		if (loginError.isError) {
			setLoginError({ isError: false, errorMsg: "" });
		}
	}, [watch().id, watch().password]);

	return (
		<form onSubmit={handleSubmit(submitHandler)} className="mt-[5.625rem]">
			<div className="mx-auto flex h-[8.875rem] flex-col px-4 sm:w-[23.563rem]">
				<input
					id="id"
					type="text"
					autoComplete="id"
					className={`${errors.id && "mb-2"} w-full border-b ${
						(loginError.isError || errors.id) && "border-danger"
					} py-[0.875rem] outline-none focus:border-b-black`}
					placeholder="아이디를 입력해주세요"
					{...register("id")}
				/>
				{errors.id && errors.id.message && (
					<ErrorMsg message={errors.id.message} />
				)}
				<input
					id="password"
					type="password"
					autoComplete="new-password"
					className={`${errors.password && "mb-2"} w-full border-b ${
						(loginError.isError || errors.password) && "border-danger"
					} py-[0.875rem] outline-none focus:border-b-black`}
					placeholder="비밀번호를 입력해주세요"
					{...register("password")}
				/>
				{errors.password && errors.password.message && (
					<ErrorMsg message={errors.password.message} />
				)}
				<div className="mt-4 sm:w-[23.563rem]">
					{loginError.isError && <ErrorMsg message={loginError.errorMsg} />}
				</div>
			</div>
			<div className="mx-auto mb-28 mt-[5.875rem] flex flex-col items-center px-4 sm:w-[23.563rem]">
				<button
					type="submit"
					disabled={!isValid}
					className="disabled:bg-disabled-tekhelet bg-tekhelet  mb-4 w-full rounded-[0.25rem] py-4 font-bold text-white"
				>
					로그인
				</button>
				<Link
					to="/signUp"
					className="text-tekhelet border-iris w-full rounded-[0.25rem] border py-4 text-center font-bold"
				>
					회원가입
				</Link>
			</div>
		</form>
	);
};

export default LoginFormSection;

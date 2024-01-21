import { LOGIN_SCHEMA } from "@/constants/formSchema";
import useAxios from "@/hooks/useAxios";
import { setCookie } from "@/utils/cookies";
import ErrorMsg from "@components/common/errorMsg/ErrorMsg";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../common/spinner/Spinner";

interface ILoginFormValues {
	readonly id: string;
	readonly password: string;
}

interface IError {
	readonly isError: boolean;
	readonly errorMsg: string;
}

const LoginFormSection = () => {
	const { isLoading, axiosData } = useAxios();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		getValues,
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

	const submitHandler = async (data: ILoginFormValues) => {
		if (!validate(data)) return;

		const response = await axiosData("default", {
			method: "POST",
			url: "/api/api/v1/auth/signin",
			data: {
				username: getValues().id,
				password: getValues().password,
			},
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				setCookie("accessToken", response.data.data.accessToken);
				navigate("/mypage");
			}

			if (status === 400) {
				setLoginError({
					isError: true,
					errorMsg: "아이디나 비밀번호를 다시 확인해주세요.",
				});
			}

			// TODO : API 수정되면 해당 코드 삭제 예정
			if (status === 401) {
				setLoginError({
					isError: true,
					errorMsg: "아이디나 비밀번호를 다시 확인해주세요.",
				});
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다. 잠시후에 다시 시도해주세요");
			}
		}
	};

	useEffect(() => {
		if (loginError.isError) {
			setLoginError({ isError: false, errorMsg: "" });
		}
	}, [watch().id, watch().password]);

	return (
		<>
			<form onSubmit={handleSubmit(submitHandler)} className="mt-[5.625rem]">
				<div className="mx-auto flex h-[8.875rem] flex-col px-4 sm:w-[23.563rem]">
					<input
						id="id"
						type="text"
						autoComplete="id"
						className={`${errors.id && "mb-2"} w-full rounded-none border-b ${
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
						className={`${
							errors.password && "mb-2"
						} w-full rounded-none border-b ${
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
						className="mb-4 w-full  rounded-[0.25rem] bg-tekhelet py-4 font-bold text-white disabled:bg-disabled-tekhelet"
					>
						로그인
					</button>
					<Link
						to="/signUp"
						className="w-full rounded-[0.25rem] border border-iris py-4 text-center font-bold text-tekhelet"
					>
						회원가입
					</Link>
				</div>
			</form>
			{isLoading && <Spinner />}
		</>
	);
};

export default LoginFormSection;

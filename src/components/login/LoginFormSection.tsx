import _ from "lodash";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import ErrorMsg from "@components/common/errorMsg/ErrorMsg";

interface ILoginFormValues {
	readonly id: string;
	readonly password: string;
}

interface IError {
	readonly isError: boolean;
	readonly errorMsg: string;
}

const LoginFormSection = () => {
	const [loginFormValues, setLoginFormValues] = useState<ILoginFormValues>({
		id: "",
		password: "",
	});
	const [error, setError] = useState<IError>({
		isError: false,
		errorMsg: "",
	});

	const onChangeFormValueHandler = _.throttle((e) => {
		if (error.isError) {
			setError({
				isError: false,
				errorMsg: "",
			});
		}
		setLoginFormValues({ ...loginFormValues, [e.target.id]: e.target.value });
	}, 1000);

	const validate = () => {
		if (loginFormValues.id.length === 0) {
			return false;
		}

		if (loginFormValues.password.length === 0) {
			return false;
		}

		return true;
	};

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validate()) return;

		// 임시 에러
		setError({
			isError: true,
			errorMsg: "아이디나 비밀번호를 다시 확인해주세요.",
		});

		// TODO : API 만들어지면 로그인 기능 붙일 예정
	};

	return (
		<form onSubmit={submitHandler} className="mt-[5.625rem]">
			<div className="mx-auto flex h-[8.875rem] flex-col px-4 sm:w-[23.563rem]">
				<input
					id="id"
					type="text"
					autoComplete="id"
					className={`w-full border-b ${
						error.isError && "border-danger"
					} py-[0.875rem] outline-none focus:border-b-black`}
					placeholder="아이디를 입력해주세요"
					onChange={onChangeFormValueHandler}
				/>
				<input
					id="password"
					type="password"
					autoComplete="new-password"
					className={`w-full border-b ${
						error.isError && "border-danger"
					} py-[0.875rem] outline-none focus:border-b-black`}
					placeholder="비밀번호를 입력해주세요"
					onChange={onChangeFormValueHandler}
				/>
				<div className="mt-4 px-4 sm:w-[23.563rem]">
					{error.isError && <ErrorMsg message={error.errorMsg} />}
				</div>
			</div>
			<div className="mx-auto mb-28 mt-[5.875rem] flex flex-col items-center px-4 sm:w-[23.563rem]">
				<button
					type="submit"
					className={`${
						loginFormValues.id.length !== 0 &&
						loginFormValues.password.length !== 0
							? "bg-tekhelet"
							: "bg-disabled-tekhelet"
					} mb-4 w-full rounded-[0.25rem] py-4 font-bold text-white`}
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

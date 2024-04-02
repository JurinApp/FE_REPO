import useInput from "@/hooks/useInput";
import { ISignUpConfirmModalState } from "@/states/modalState/signUpConfirmModal";
import { useEffect, useRef, useState } from "react";
import {
	UseFormClearErrors,
	UseFormGetValues,
	UseFormSetError,
	UseFormWatch,
} from "react-hook-form";
import { SetterOrUpdater } from "recoil";
import useAxios from "./useAxios";

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

interface IForm {
	readonly id: string;
	readonly password: string;
	readonly checkPassword: string;
	readonly name: string;
	readonly auth: string;
}

interface IUseSignUpValidateProps {
	getValues: UseFormGetValues<IForm>;
	watch: UseFormWatch<IForm>;
	setError: UseFormSetError<IForm>;
	clearErrors: UseFormClearErrors<IForm>;
	setConfirmModalState: SetterOrUpdater<ISignUpConfirmModalState>;
}

const useSignUpValidate = ({
	getValues,
	watch,
	setError,
	clearErrors,
	setConfirmModalState,
}: IUseSignUpValidateProps) => {
	const [code, onChangeCodeHandler, setCode] = useInput("");
	const { axiosData, isFetchLoading } = useAxios();
	const codeRef = useRef<HTMLInputElement>(null);

	const [idDuplication, setIdDuplication] = useState<IIdDuplicateCheck>({
		isIdDuplicateCheck: false,
		idDuplicateMsg: "",
		isIdBtnDisabled: true,
	});

	const [codeDuplication, setCodeDuplication] = useState<ICodeDuplicateCheck>({
		isCodeDuplicateCheck: false,
		codeDuplicateMsg: "",
		isCodeBtnDisabled: true,
	});

	const [codeError, setCodeError] = useState<ICodeError>({
		isError: false,
		codeErrorMsg: "",
	});

	const handleIdDuplicate = async () => {
		const response = await axiosData("default", {
			method: "POST",
			url: "/api/v1/auth/validate",
			data: {
				validateValue: getValues().id,
				validateType: "username",
			},
		});

		if (response) {
			const status = response.status;
			const isValidId = response.data.data.isValid;

			if (status === 200) {
				if (isValidId) {
					clearErrors("id");
					setIdDuplication({
						isIdDuplicateCheck: true,
						idDuplicateMsg: "사용 가능한 아이디입니다.",
						isIdBtnDisabled: true,
					});
				} else {
					setError("id", {
						message: "사용할 수 없는 아이디입니다.",
						type: "onChange",
					});
					setIdDuplication({
						isIdDuplicateCheck: false,
						idDuplicateMsg: "",
						isIdBtnDisabled: false,
					});
				}
			}

			if (status === 400) {
				setError("id", {
					message: "사용할 수 없는 아이디입니다.",
					type: "onChange",
				});
				setIdDuplication({
					isIdDuplicateCheck: false,
					idDuplicateMsg: "",
					isIdBtnDisabled: false,
				});
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다 잠시 후에 다시 시도해주세요.");
			}
		}
	};

	const handleCodeDuplicateCheck = async () => {
		const response = await axiosData("default", {
			method: "POST",
			url: "/api/v1/auth/validate",
			data: {
				validateValue: code,
				validateType: "verification_code",
			},
		});

		if (response) {
			const status = response.status;
			const isValidCode = response.data.data.isValid;

			if (status === 200) {
				if (isValidCode) {
					setCodeError({
						isError: false,
						codeErrorMsg: "",
					});
					setCodeDuplication({
						isCodeDuplicateCheck: true,
						codeDuplicateMsg: "인증이 완료되었습니다.",
						isCodeBtnDisabled: true,
					});
				} else {
					setCodeError({
						isError: true,
						codeErrorMsg: "인증코드가 일치하지 않습니다.",
					});
					setCodeDuplication({
						isCodeDuplicateCheck: false,
						codeDuplicateMsg: "인증코드가 일치하지 않습니다.",
						isCodeBtnDisabled: false,
					});
				}
			}
			if (status === 400) {
				setCodeDuplication({
					isCodeDuplicateCheck: false,
					codeDuplicateMsg: "인증코드가 일치하지 않습니다.",
					isCodeBtnDisabled: false,
				});
			}
		}
	};

	useEffect(() => {
		if (
			watch().auth === "1" &&
			codeDuplication.isCodeBtnDisabled &&
			code.length === 8
		) {
			setCodeDuplication((prevState) => ({
				...prevState,
				isCodeBtnDisabled: false,
			}));
		} else {
			setCodeDuplication((prevState) => ({
				...prevState,
				isCodeBtnDisabled: true,
			}));
		}
	}, [code]);

	useEffect(() => {
		const auth = watch().auth;

		if (auth === "2") {
			setCodeError({
				isError: false,
				codeErrorMsg: "",
			});
			setCodeDuplication({
				isCodeDuplicateCheck: true,
				codeDuplicateMsg: "",
				isCodeBtnDisabled: true,
			});
			setCode("");

			if (codeRef.current) {
				codeRef.current.value = "";
			}
		}

		if (auth === "1") {
			setCodeDuplication((prevState) => ({
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

		if (idDuplication.isIdBtnDisabled && id.length >= 8) {
			setIdDuplication({
				isIdDuplicateCheck: false,
				idDuplicateMsg: "",
				isIdBtnDisabled: false,
			});
			setError("id", {
				message: "아이디 중복확인을 하세요.",
				type: "onChange",
			});
		}

		if (id.length < 8) {
			setIdDuplication({
				isIdDuplicateCheck: false,
				idDuplicateMsg: "",
				isIdBtnDisabled: true,
			});
		}
	}, [watch().id]);

	useEffect(() => {
		watch("password") !== watch("checkPassword") && watch("password")
			? setError("checkPassword", {
					type: "passwordMissMatch",
					message: "비밀번호가 일치하지 않습니다.",
				})
			: clearErrors("checkPassword");
	}, [watch().password, watch().checkPassword]);

	return {
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
	};
};

export default useSignUpValidate;

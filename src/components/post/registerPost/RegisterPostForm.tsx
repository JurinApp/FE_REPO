import ErrorMsg from "@/components/common/errorMsg/ErrorMsg";
import Spinner from "@/components/common/spinner/Spinner";
import { POST_SCHEMA } from "@/constants/formSchema";
import useRegisterPost from "@/hooks/mutations/post/useRegisterPost";
import { registerPostModalState } from "@/states/modalState/confirmModalState";
import {
	changeDateFormat,
	changeFormDateFormat,
} from "@/utils/changeDateFormat";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

interface IRegisterPostFormProps {
	readonly isRegister: boolean;
}

const RegisterPostForm = ({ isRegister }: IRegisterPostFormProps) => {
	const setIsOpenModal = useSetRecoilState(registerPostModalState);
	const [replaceDate, setReplaceDate] = useState<string>("");
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			itemName: "",
			registerDate: "",
			title: "",
			content: "",
		},
		resolver: yupResolver(POST_SCHEMA),
		mode: "onChange",
	});
	const { mutate, isPending } = useRegisterPost();

	const handleClickRegisterBtn = () => {
		setIsOpenModal(true);
	};

	const initChangeDateFormat = () => {
		const formDate = changeFormDateFormat();
		const replaceDate = changeDateFormat(formDate);

		setValue("registerDate", formDate);
		setReplaceDate(replaceDate);
	};

	useEffect(() => {
		if (isRegister && isValid) {
			const submitData = {
				mainTitle: getValues("itemName"),
				subTitle: getValues("title"),
				date: getValues("registerDate"),
				content: getValues("content"),
			};

			mutate(submitData);
		}
	}, [isRegister]);

	useEffect(() => {
		initChangeDateFormat();
	}, []);

	return (
		<>
			{isPending ? (
				<Spinner />
			) : (
				<div className="h-[calc(100vh-7.125rem)] w-full px-4 pt-6">
					<form onSubmit={handleSubmit(handleClickRegisterBtn)}>
						<div className="flex h-[calc(100vh-18rem)] flex-col items-center overflow-y-auto bg-white px-6">
							<div className="mb-[0.875rem] mt-6 w-full">
								<label htmlFor="title" hidden>
									게시글 제목
								</label>
								<input
									type="text"
									placeholder="상품명을 입력해주세요"
									id="itemName"
									className={`mb-2 w-full rounded-none border-b pb-[0.625rem] font-bold outline-none placeholder:text-black-300 ${
										errors.itemName
											? "border-danger"
											: "border-black-100 focus:border-black-800"
									}`}
									{...register("itemName")}
								/>
								{errors.itemName && errors.itemName.message && (
									<ErrorMsg message={errors.itemName.message} />
								)}
							</div>
							<div className="mb-[0.875rem] flex w-full">
								<label
									htmlFor="registerDate"
									className="mr-[0.625rem] w-[3rem] text-black-800"
								>
									날짜
								</label>
								<input
									type="text"
									className={`hidden w-full rounded-none border-b pb-[0.625rem] outline-none ${
										errors.registerDate
											? "border-danger"
											: "border-black-100 focus:border-black-800"
									}`}
									id="registerDate"
									{...register("registerDate")}
								/>
								<input
									type="text"
									className={`w-full rounded-none border-b pb-[0.625rem] outline-none ${
										errors.registerDate
											? "border-danger"
											: "border-black-100 focus:border-black-800"
									}`}
									id="replaceDate"
									readOnly
									defaultValue={replaceDate}
								/>
								{errors.registerDate && errors.registerDate.message && (
									<ErrorMsg message={errors.registerDate.message} />
								)}
							</div>
							<div className="mb-[0.875rem] flex w-full flex-col">
								<div className="mb-2 flex">
									<label
										htmlFor="title"
										className="mr-[0.625rem] w-[3rem] text-black-800"
									>
										제목
									</label>
									<input
										type="text"
										className={`w-full rounded-none border-b pb-[0.625rem] outline-none ${
											errors.title
												? "border-danger"
												: "border-black-100 focus:border-black-800"
										}`}
										id="title"
										defaultValue={replaceDate}
										{...register("title")}
									/>
								</div>
								{errors.title && errors.title.message && (
									<ErrorMsg message={errors.title.message} />
								)}
							</div>
							<div className="flex w-full flex-col">
								<div className="mb-2 flex">
									<label
										htmlFor="content"
										className="mr-[0.625rem] w-[3rem] text-black-800"
									>
										내용
									</label>
									<textarea
										className={`w-full resize-none rounded-none border-b outline-none ${
											errors.content
												? "border-danger"
												: "border-black-100 focus:border-black-800"
										}`}
										id="content"
										{...register("content")}
									/>
								</div>
								{errors.content && errors.content.message && (
									<ErrorMsg message={errors.content.message} />
								)}
							</div>
						</div>
						<button
							type="submit"
							className="absolute bottom-8 mx-auto h-box-height w-[91.5%] rounded-[0.25rem] bg-tekhelet font-bold text-white"
						>
							등록
						</button>
					</form>
				</div>
			)}
		</>
	);
};

export default RegisterPostForm;

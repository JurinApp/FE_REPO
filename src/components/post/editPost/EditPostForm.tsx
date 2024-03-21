import ErrorMsg from "@/components/common/errorMsg/ErrorMsg";
import Spinner from "@/components/common/spinner/Spinner";
import { POST_SCHEMA } from "@/constants/formSchema";
import useEditPost from "@/hooks/mutations/post/useEditPost";
import useEditDetailPost from "@/hooks/queries/post/useEditDetailPost";
import { editPostModalState } from "@/states/modalState/confirmModalState";
import { changeDateFormat } from "@/utils/changeDateFormat";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

interface IEditPostFormProps {
	readonly isEdit: boolean;
}

const EditPostForm = ({ isEdit }: IEditPostFormProps) => {
	const setIsOpenModal = useSetRecoilState(editPostModalState);
	const [replaceFormDate, setReplaceFormDate] = useState<string>("");
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

	const { data, isLoading } = useEditDetailPost();
	const { mutate, isPending } = useEditPost();

	const handleClickEditBtn = () => {
		setIsOpenModal(true);
	};

	const handleSubmitEdit = () => {
		const submitData = {
			mainTitle: getValues("itemName"),
			subTitle: getValues("title"),
			date: getValues("registerDate"),
			content: getValues("content"),
		};
		mutate(submitData);
	};

	const setFormValue = () => {
		setValue("itemName", data.mainTitle);
		setValue("title", data.subTitle);
		setValue("registerDate", data.date);
		setValue("content", data.content);

		const replaceDate = changeDateFormat(data.date);
		setReplaceFormDate(replaceDate);
	};

	useEffect(() => {
		if (data) {
			setFormValue();
		}
	}, [data]);

	useEffect(() => {
		if (isEdit && isValid) {
			handleSubmitEdit();
		}
	}, [isEdit]);

	return (
		<div className="h-[calc(100vh-7.125rem)] w-full px-4 pt-6">
			{isLoading || isPending ? (
				<Spinner />
			) : (
				<form onSubmit={handleSubmit(handleClickEditBtn)}>
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
										? "focus:border-danger"
										: "border-black-100 focus:border-black-800"
								}`}
								{...register("itemName")}
							/>
							{errors.itemName && errors.itemName.message && (
								<ErrorMsg message={errors.itemName.message} />
							)}
						</div>
						<div className="mb-[0.875rem] flex w-full flex-col">
							<div className="mb-2 flex">
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
											? "focus:border-danger"
											: "border-black-100 focus:border-black-800"
									}`}
									id="registerDate"
									readOnly
									{...register("registerDate")}
								/>
								<input
									type="text"
									className={`w-full rounded-none border-b pb-[0.625rem] outline-none ${
										errors.registerDate
											? "focus:border-danger"
											: "border-black-100 focus:border-black-800"
									}`}
									id="replaceDate"
									defaultValue={replaceFormDate}
									readOnly
								/>
							</div>
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
									rows={8}
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
						수정
					</button>
				</form>
			)}
		</div>
	);
};

export default EditPostForm;

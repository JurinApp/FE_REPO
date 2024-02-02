import ErrorMsg from "@/components/common/errorMsg/ErrorMsg";
import { POST_SCHEMA } from "@/constants/formSchema";
import { editPostModalState } from "@/states/confirmModalState";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

// interface ICheckDay {
// 	[key: number]: string;
// }

interface IEditPostFormProps {
	readonly isEdit: boolean;
}

// const CHECK_DAY: ICheckDay = {
// 	0: "일",
// 	1: "월",
// 	2: "화",
// 	3: "수",
// 	4: "목",
// 	5: "금",
// 	6: "토",
// };

const EditPostForm = ({ isEdit }: IEditPostFormProps) => {
	const setIsOpenModal = useSetRecoilState(editPostModalState);
	const {
		register,
		handleSubmit,
		// setValue,
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

	const handleClickEditBtn = () => {
		setIsOpenModal(true);
	};

	const handleSubmitEdit = () => {
		if (!isValid) return;
		// API 구현되면 코드 추가 예정
	};

	useEffect(() => {
		if (isEdit) {
			handleSubmitEdit();
		}
	}, [isEdit]);

	return (
		<div className="h-[calc(100vh-7.125rem)] w-full px-4 pt-6">
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
								className={`w-full rounded-none border-b pb-[0.625rem] outline-none ${
									errors.registerDate
										? "focus:border-danger"
										: "border-black-100 focus:border-black-800"
								}`}
								id="registerDate"
								readOnly
								{...register("registerDate")}
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
		</div>
	);
};

export default EditPostForm;

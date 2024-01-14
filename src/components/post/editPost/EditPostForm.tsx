import { IPostFormValue } from "@/interface/post";
import { editPostModalState } from "@/states/confirmModalState";
import _ from "lodash";
import { FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";

const EditPostForm = () => {
	const setIsOpenEditModal = useSetRecoilState(editPostModalState);
	const [, setFormValue] = useState<IPostFormValue>({
		itemName: "",
		registerDate: "",
		title: "",
		content: "",
	});

	const onClickEditBtnHandler = (e: FormEvent) => {
		e.preventDefault();
		setIsOpenEditModal(true);
	};

	const onChangeFormValueHandler = (type: string) => {
		const throttledHandler = _.throttle((e) => {
			setFormValue((prevFormValue) => ({
				...prevFormValue,
				[type]: e.target.value,
			}));
		}, 1000);

		if (
			type === "title" ||
			type === "registerDate" ||
			type === "itemName" ||
			type === "content"
		) {
			return throttledHandler;
		}

		return;
	};

	const titleHandler = onChangeFormValueHandler("title");
	const dateHandler = onChangeFormValueHandler("registerDate");
	const itemNameHandler = onChangeFormValueHandler("itemName");
	const contentHandler = onChangeFormValueHandler("content");

	return (
		<div className="h-[calc(100vh-7.125rem)] w-full px-4 pt-6">
			<form>
				<div className="flex h-[calc(100vh-30rem)] flex-col items-center overflow-y-auto bg-white px-6">
					<div className="mb-[0.875rem] mt-6 w-full">
						<label htmlFor="title" hidden>
							게시글 제목
						</label>
						<input
							type="text"
							placeholder="상품명을 입력해주세요"
							id="itemName"
							className="w-full border-b border-black-100 pb-[0.625rem] font-bold text-black-300 outline-none focus:border-black-800"
							onChange={itemNameHandler}
						/>
					</div>
					<div className="mb-[0.875rem] flex w-full">
						<label
							htmlFor="registerDate"
							className="mr-[0.625rem] w-[1.875rem] text-black-800"
						>
							날짜
						</label>
						<input
							type="text"
							className="grow border-b border-black-100 pb-[0.625rem] outline-none focus:border-black-800"
							id="registerDate"
							onChange={dateHandler}
						/>
					</div>
					<div className="mb-[0.875rem] flex w-full">
						<label
							htmlFor="title"
							className="mr-[0.625rem] w-[1.875rem] text-black-800"
						>
							제목
						</label>
						<input
							type="text"
							className="grow border-b border-black-100 pb-[0.625rem] outline-none focus:border-black-800"
							id="title"
							onChange={titleHandler}
						/>
					</div>
					<div className="flex w-full">
						<label
							htmlFor="content"
							className="mr-[0.625rem] w-[1.875rem] text-black-800"
						>
							내용
						</label>
						<textarea
							className="grow resize-none border-b border-black-100 outline-none focus:border-black-800"
							id="content"
							onChange={contentHandler}
						/>
					</div>
				</div>
				<button
					type="submit"
					className="absolute bottom-8 mx-auto h-box-height w-[91.5%] rounded-[0.25rem] bg-tekhelet font-bold text-white"
					onClick={onClickEditBtnHandler}
				>
					수정
				</button>
			</form>
		</div>
	);
};

export default EditPostForm;

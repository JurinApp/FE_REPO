import ErrorMsg from "@/components/common/errorMsg/ErrorMsg";
import Spinner from "@/components/common/spinner/Spinner";
import { POST_SCHEMA } from "@/constants/formSchema";
import useAxios from "@/hooks/useAxios";
import { editPostModalState } from "@/states/modalState/confirmModalState";
import { userRoleState } from "@/states/userRoleState";
import { changeDateFormat } from "@/utils/changeDateFormat";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface IEditPostFormProps {
	readonly isEdit: boolean;
}

const EditPostForm = ({ isEdit }: IEditPostFormProps) => {
	const userRole = useRecoilValue(userRoleState);
	const setIsOpenModal = useSetRecoilState(editPostModalState);
	const navigate = useNavigate();
	const { channelId, postId } = useParams();
	const { axiosData, isFetchLoading } = useAxios();
	const queryClient = useQueryClient();
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

	const getPostData = async () => {
		const response = await axiosData("useToken", {
			method: "GET",
			url: `/${userRole}s/api/v1/channels/${channelId}/posts/${postId}`,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data.data;
			}

			if (status === 403) {
				alert(
					"해당 채널의 게시글 생성 권한이 없거나 게시글 등록 형식이 잘못되었습니다.",
				);
			}

			if (status === 404) {
				alert("존재하지 않는 게시글입니다.");
				navigate(`/${channelId}/post`);
			}
		}
	};

	const { data, isLoading } = useQuery({
		queryKey: ["detailPost", channelId, postId],
		queryFn: getPostData,
	});

	const editPostData = async () => {
		const response = await axiosData("useToken", {
			method: "PUT",
			url: `/teachers/api/v1/channels/${channelId}/posts/${postId}`,
			data: {
				mainTitle: getValues("itemName"),
				subTitle: getValues("title"),
				date: getValues("registerDate"),
				content: getValues("content"),
			},
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				alert("수정이 완료되었습니다.");
				queryClient.invalidateQueries({ queryKey: ["posts", channelId] });
				queryClient.invalidateQueries({
					queryKey: ["posts", channelId],
				});
				navigate(`/${channelId}/post/detail/${postId}`);
			}

			if (status === 500) {
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
			}
		}
	};

	const editMutation = useMutation({
		mutationKey: ["editPost"],
		mutationFn: editPostData,
	});

	const handleClickEditBtn = () => {
		setIsOpenModal(true);
	};

	const handleSubmitEdit = () => {
		if (!isValid) return;
		editMutation.mutate();
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
		if (isEdit) {
			handleSubmitEdit();
		}
	}, [isEdit]);

	return (
		<div className="h-[calc(100vh-7.125rem)] w-full px-4 pt-6">
			{isLoading || isFetchLoading ? (
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

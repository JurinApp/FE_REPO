const DeleteRegisterButton = () => {
	return (
		<div className="flex w-full">
			<button type="button" className="grow rounded-[0.25rem] border">
				삭제
			</button>
			<button
				type="button"
				className="ml-2 h-[3.25rem] grow rounded-[0.25rem] border bg-tekhelet font-bold text-white"
			>
				등록
			</button>
		</div>
	);
};

export default DeleteRegisterButton;

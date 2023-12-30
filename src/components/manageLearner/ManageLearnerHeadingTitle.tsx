const ManageLearnerHeadingTitle = () => {
	return (
		<div className="flex w-full justify-between text-black-800">
			<h1 className="font-bold">
				학생관리 <span>(28명)</span>
			</h1>
			<div className="flex items-center">
				<input type="checkbox" id="checkAll" className="h-6 w-6" />
				<label
					htmlFor="checkAll"
					className="ml-2 flex h-full items-center text-sm"
				>
					전체 선택
				</label>
			</div>
		</div>
	);
};

export default ManageLearnerHeadingTitle;

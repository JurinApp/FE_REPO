const RegisterItemForm = () => {
	return (
		<div className="mx-auto bg-btn-cancel px-4 sm:w-[24.563rem]">
			<form>
				<div>
					<label htmlFor="itemName" className="hidden">
						아이템명
					</label>
					<input
						type="text"
						id="itemName"
						placeholder="아이템명을 입력해주세요"
					/>
				</div>
				<div>
					<label htmlFor="">이미지</label>
					<input type="file" />
				</div>
				<div>
					<label htmlFor="quantity">수량</label>
					<input type="text" id="quantity" />
				</div>
				<div>
					<label htmlFor="content">내용</label>
					<textarea id="content" />
				</div>
				<button type="submit">등록</button>
			</form>
		</div>
	);
};

export default RegisterItemForm;

import * as yup from "yup";

export const LOGIN_SCHEMA = yup.object().shape({
	id: yup
		.string()
		.required("아이디를 입력하세요.")
		.matches(/^[a-z0-9]+$/, "올바른 아이디를 입력해주세요."),
	password: yup.string().required("비밀번호를 입력해주세요."),
});

export const SIGN_UP_SCHEMA = yup.object().shape({
	id: yup
		.string()
		.matches(/^[a-z0-9]+$/, "올바른 아이디 형식을 입력해주세요.")
		.required("아이디 입력은 필수입니다.")
		.min(8, "아이디는 최소 8자 이상입니다.")
		.max(12, "아이디는 최대 12자리입니다."),
	password: yup
		.string()
		.min(8, "비밀번호는 최소 8자 이상입니다.")
		.max(16, "비밀번호는 최대 16자리입니다.")
		.matches(
			/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}[^\s]*$/,
			"영소문자, 숫자, 특수문자를 모두 포함한 8자리 이상 입력해주세요.",
		)
		.oneOf([yup.ref("checkPassword")], "비밀번호가 일치하지 않습니다.")
		.required("비밀번호를 입력해주세요"),
	checkPassword: yup
		.string()
		.min(8, "비밀번호는 최소 8자 이상입니다.")
		.max(16, "비밀번호는 최대 16자리입니다.")
		.matches(
			/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}[^\s]*$/,
			"영소문자, 숫자, 특수문자를 모두 포함한 8자리 이상 입력해주세요.",
		)
		.oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
		.required("비밀번호를 입력해주세요."),
	name: yup
		.string()
		.min(2, "이름은 최소 2자 이상입니다.")
		.max(8, "이름은 최대 8자리입니다.")
		.matches(/^[가-힣]+$/, "이름은 한글 입력만 가능합니다.")
		.required("이름 입력은 필수입니다."),
	auth: yup.string().required("권한을 선택하세요."),
});

export const REGISTER_TRADE_STOCK_SCHEMA = yup.object().shape({
	stockName: yup.string().required("종목명 입력은 필수입니다."),
	price: yup.string().required("가격 입력은 필수입니다."),
	tax: yup.string().required("세금 입력은 필수입니다."),
	standard: yup.string().required("기준 입력은 필수입니다."),
	content: yup.string().required("내용 입력은 필수입니다."),
});

export const POST_SCHEMA = yup.object().shape({
	itemName: yup.string().required("아이템명 입력은 필수입니다."),
	registerDate: yup.string().required("날짜 입력은 필수입니다."),
	title: yup.string().required("제목 입력은 필수입니다."),
	content: yup.string().required("내용 입력은 필수입니다."),
});

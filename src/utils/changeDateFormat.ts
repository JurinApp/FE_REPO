interface ICheckDay {
	readonly [key: number]: string;
}

const CHECK_DAY: ICheckDay = {
	0: "일",
	1: "월",
	2: "화",
	3: "수",
	4: "목",
	5: "금",
	6: "토",
};

export const changeDateFormat = (paramDate: string) => {
	const date = new Date(paramDate);
	const replaceDate = `${date.getFullYear()}년 ${
		date.getMonth() + 1
	}월 ${date.getDate()}일 (${CHECK_DAY[date.getDay()]})`;

	return replaceDate;
};

export const changeFormDateFormat = (targetDate: Date | null = null) => {
	const todayDate = targetDate === null ? new Date() : new Date(targetDate);
	const month =
		todayDate.getMonth() < 10
			? `0${todayDate.getMonth() + 1}`
			: todayDate.getMonth() + 1;
	const date =
		todayDate.getDate() < 10 ? `0${todayDate.getDate()}` : todayDate.getDate();
	const replaceDate = `${todayDate.getFullYear()}-${month}-${date}`;
	return replaceDate;
};

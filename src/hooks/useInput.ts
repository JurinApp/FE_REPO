import _ from "lodash";
import { useState } from "react";

const useInput = (initValue: any) => {
	const [text, setText] = useState<any>(initValue);

	const onChangeTextHandler = _.throttle((e) => {
		setText(e.target.value);
	}, 1000);

	return { text, onChangeTextHandler };
};

export default useInput;

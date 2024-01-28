import GoBackButton from "../../../common/GoBackButton/GoBackButton";
import RegisterItemForm from "./RegisterItemForm";

const RegisterItemContainer = () => {
	return (
		<div className="relative mx-auto w-full bg-btn-cancel sm:w-[24.563rem]">
			<GoBackButton />
			<RegisterItemForm />
		</div>
	);
};

export default RegisterItemContainer;

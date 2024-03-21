import GoBackButton from "../common/GoBackButton/GoBackButton";
import SettingSection from "./SettingSection";
import WithdrawalModal from "./WithdrawalModal";

const SettingContainer = () => {
	return (
		<div className="mx-auto h-[calc(100vh-2.938rem)] bg-white bg-opacity-5 sm:w-[23.563rem]">
			<GoBackButton backNavigationPath={"back"} />
			<SettingSection />
			<WithdrawalModal />
		</div>
	);
};

export default SettingContainer;

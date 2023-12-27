import { BeatLoader } from "react-spinners";

const Spinner = () => {
	return (
		<div className="fixed top-0 z-[100] flex min-h-screen w-full items-center justify-center bg-[rgba(229,229,229,0.6)]">
			<BeatLoader color="#7678ED" />
		</div>
	);
};

export default Spinner;

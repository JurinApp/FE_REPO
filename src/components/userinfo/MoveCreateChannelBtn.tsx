import { Link } from "react-router-dom";

const MoveCreateChannelBtn = () => {
	return (
		<>
			<Link to="/createChannel">
				<button
					className="mb-8 ml-4 flex h-[3.188rem] w-[361px] items-center justify-center rounded bg-tekhelet"
					id="button"
				>
					<p className="font-medium text-white">채널 생성</p>
				</button>
			</Link>
		</>
	);
};

export default MoveCreateChannelBtn;

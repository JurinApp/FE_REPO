interface ISuccessMsgProps {
	message: string;
}

const SuccessMsg = ({ message }: ISuccessMsgProps) => {
	return <p className="text-tekhelet w-full text-left text-sm">{message}</p>;
};

export default SuccessMsg;

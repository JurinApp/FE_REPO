interface IErrorMsgProps {
	message: string;
}

const ErrorMsg = ({ message }: IErrorMsgProps) => {
	return <p className="text-danger w-full text-left text-sm">{message}</p>;
};

export default ErrorMsg;

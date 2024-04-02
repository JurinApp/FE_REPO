import { RefObject } from "react";

interface IObserverTargetProps {
	readonly observeTargetRef: RefObject<HTMLDivElement>;
}

const ObserveTarget = ({ observeTargetRef }: IObserverTargetProps) => {
	return <div ref={observeTargetRef} />;
};

export default ObserveTarget;

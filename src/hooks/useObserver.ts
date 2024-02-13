import { InfiniteQueryObserverResult } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

//hook props interface
interface IUseIntersectionObserverProps {
	// readonly observeTargetRef: RefObject<HTMLDivElement>;
	threshold?: number;
	readonly hasNextPage: boolean | undefined;
	readonly fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export const useIntersectionObserver = ({
	threshold = 0.1,
	hasNextPage,
	fetchNextPage,
}: IUseIntersectionObserverProps) => {
	const observeTargetRef = useRef<HTMLDivElement>(null);

	const observerCallback: IntersectionObserverCallback = (entries) => {
		entries.forEach((entry) => {
			//target이 화면에 관찰되고, 다음페이지가 있다면 다음페이지를 호출
			if (entry.isIntersecting && hasNextPage) {
				fetchNextPage();
			}
		});
	};

	useEffect(() => {
		if (observeTargetRef.current === null) return;

		//ointersection observer 인스턴스 생성
		const observer = new IntersectionObserver(observerCallback, {
			threshold,
		});

		// 타겟 관찰 시작
		observer.observe(observeTargetRef.current);

		// 관찰 멈춤
		return () => {
			if (observeTargetRef.current) {
				observer.unobserve(observeTargetRef.current);
			}
		};
	}, [observerCallback, threshold, observeTargetRef]);

	return observeTargetRef;
};

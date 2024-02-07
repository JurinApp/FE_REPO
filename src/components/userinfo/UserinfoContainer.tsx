import useAxios from "@/hooks/useAxios";
import { EnterChannelModal } from "../channel/EnterChannelModal";
import MoveModifyBtn from "./MoveModifyBtn";
import UserinfoSection from "./UserinfoSection";
import { useRecoilValue } from "recoil";
import { userRoleState } from "@/states/userRoleState";
import Spinner from "../common/spinner/Spinner";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface IUser {
	readonly name: string;
	readonly school: string;
	readonly authority: string;
}

interface IChannelInfo {
	readonly name: string;
	readonly code: string;
}

export interface IUserinfo {
	readonly user: {
		id: number;
		nickname: string;
		schoolName: string;
		userRole: string;
	};
	readonly channel?: {
		name: string;
	};
}

export const SAMPLE_DATA: IUser = {
	name: "홍길동",
	school: "홍길초등학교",
	authority: "선생님",
};

export const SAMPLE_CHANNEL: IChannelInfo = {
	name: "1-A반",
	code: "1A2B3C4D",
};
export const UserinfoContainer = () => {
	const { axiosData } = useAxios();
	const role =
		useRecoilValue(userRoleState) === "teacher" ? "teacher" : "student";

	const fetchUserinfo = async () => {
		const apiUrl = `/${role}s/api/v1/users/profile`;
		const response = await axiosData("useToken", {
			method: "GET",
			url: apiUrl,
		});
		if (role === "student") {
			if (response) {
				const status = response.status;
				if (status === 200) {
					return { user: response.data.data, channel: "" };
				}
			}
		} else {
			if (response) {
				const status = response.status;
				if (status === 200) {
					return response.data.data;
				}
			}
		}
	};
	const fetchChannel = async () => {
		const apiUrl = `/${role}s/api/v1/channels`;
		const response = await axiosData("useToken", {
			method: "GET",
			url: apiUrl,
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				return response.data.data;
			}
		}
	};
	const results = useQueries({
		queries: [
			{
				queryKey: ["userinfo"],
				queryFn: fetchUserinfo,
			},
			{
				queryKey: ["channelInfo"],
				queryFn: fetchChannel,
			},
		],
	});
	const isLoading = results.some((query) => query.isLoading);
	console.log("userinfo", results[0].data);
	console.log("channelInfo", results[1].data);

	return (
		<div className="mx-auto flex h-[calc(100vh-2.938rem)] flex-col justify-end gap-4 bg-btn-cancel-tekhelet sm:w-[24.563rem]">
			<MoveModifyBtn />
			{!isLoading && (
				<UserinfoSection userinfo={results[0].data} channel={results[1].data} />
			)}
			<EnterChannelModal />
			{isLoading && <Spinner />}
		</div>
	);
};

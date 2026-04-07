import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type ScenarioResponse, type CreateUserDto, type SignInDto, type User, type ScenarioResponseS } from "./api.types";
import scenarioSlice from "@/store/slices/scenario";
import usersSlice from "@/store/slices/users";
import { type User as IUser } from "@/store/slices/users";

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:9932/",
		credentials: "include",
		prepareHeaders(headers) {
			headers.set("Content-Type", "application/json");
		},
	}),
	endpoints: (builder) => ({
		/* auth */
		signUp: builder.mutation<User, CreateUserDto>({
			query: (dto) => ({
				method: "POST",
				url: "auth/signUp",
				body: dto,
			}),
		}),
		signIn: builder.mutation<User, SignInDto>({
			query: (dto) => ({
				method: "POST",
				url: "auth/signIn",
				body: dto,
			}),
		}),
		signOut: builder.mutation<{ token: string }, void>({
			query: () => ({
				method: "POST",
				url: "auth/signOut",
			}),
		}),
		getMe: builder.query<User, void>({
			query: () => ({
				url: "auth/refresh",
				method: "GET",
			}),
		}),
		getAllUsers: builder.query<IUser[], void>({
			query: () => ({
				url: "auth/users",
				method: "GET",
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(usersSlice.actions.setUsers(data));
				} catch (error) {
					console.error(`Failed to fetch scenarios: ${error}`);
				}
			},
		}),
		/* scenario */
		getScenario: builder.query<ScenarioResponse, void>({
			query: () => ({
				method: "GET",
				url: "scenario/my",
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(scenarioSlice.actions.setMyScenarios(data.data.my));
					dispatch(scenarioSlice.actions.setSharedScenarios(data.data.shared));
				} catch (error) {
					console.error(`Failed to fetch scenarios: ${error}`);
				}
			},
		}),
		addContribution: builder.mutation<
			ScenarioResponseS,
			{ scenarioId: number; dialogueId: number; lineId: number; userId: number; contributionContent: string }
		>({
			query: (data) => ({
				method: "POST",
				url: "scenario/addContribution",
				body: data,
			}),
		}),
		changeSelectedContribution: builder.mutation<
			ScenarioResponseS,
			{ scenarioId: number; dialogueId: number; lineId: number; userId: number; contributionId: number | "initial" }
		>({
			query: (data) => ({
				method: "POST",
				url: "scenario/changeSelectedContribution",
				body: data,
			}),
		}),
	}),
});

export const {
	useSignUpMutation,
	useSignInMutation,
	useSignOutMutation,
	useLazyGetScenarioQuery,
	useLazyGetAllUsersQuery,
	useAddContributionMutation,
	useChangeSelectedContributionMutation,
	useGetMeQuery,
} = api;

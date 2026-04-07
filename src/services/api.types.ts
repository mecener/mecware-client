export interface ApiResponse<T> {
	data?: T;
	message?: string;
	error?: string;
	statusCode: number;
}
export interface User {
	user: {
		id: number;
		email: string;
		isActivated: boolean;
		username: string;
	};
	accessToken: string;
	refreshToken: string;
}
export interface ApiError {
	errors: [];
	message: string;
}
export interface CreateUserDto {
	email: string;
	username: string;
	password: string;
}
export interface SignInDto {
	login: string;
	password: string;
}
export interface UpdateUserDto {
	name?: string;
	email?: string;
}
export interface UsersDb {
	users: User[];
}
/* scenario */
export interface ScenarioResponse {
	success: boolean;
	message: string;
	data: {
		my: ScenarioAttributes[];
		shared: ScenarioAttributes[];
	};
}
export interface ScenarioResponseS {
	success: boolean;
	message: string;
	data: ScenarioAttributes[];
}
export interface Contribution {
	userId?: number;
	username?: string;
	ai?: boolean;
	content: string;
}
export interface ContentSegment {
	initial: string;
	contributions: Contribution[];
	selectedOption: "initial" | number;
}
export type ContentItem = string | ContentSegment;
export interface DialogueLine {
	id: number;
	character: string;
	content: ContentItem[];
	timestamp: string;
}
export interface ScenarioContent {
	dialogues: DialogueLine[];
}
export interface ScenarioAttributes {
	id: number;
	authorId: number;
	title: string;
	description?: string;
	content: ScenarioContent;
	contributorIds?: number[];
	createdAt?: Date;
	updatedAt?: Date;
}

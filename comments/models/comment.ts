export interface IComment {
	id: string;
	content: string;
	status: string;
}

export interface ICommentByPostId {
	[index: string]: IComment[];
}

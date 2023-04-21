interface IComment {
	id: string;
	status: string;
	content: string;
}

interface ICommentListProps {
	comments: IComment[];
}

const CommentList = ({ comments }: ICommentListProps) => {
	const renderedComments = Object.values(comments).map((comment) => {
		let content;

		if (comment.status === 'approved') {
			content = comment.content;
		} else if (comment.status === 'pending') {
			content = 'This comment is awaiting moderation';
		} else if (comment.status === 'rejected') {
			content = 'This comment has been rejected';
		}

		return <li key={comment.id}>{content}</li>;
	});

	return <ul>{renderedComments}</ul>;
};

export default CommentList;

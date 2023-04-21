import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

interface IComment {
	id: string;
	status: string;
	content: string;
}

interface IPost {
	id: string;
	title: string;
	comments: IComment[];
}

interface IPosts {
	[index: string]: IPost;
}

const PostList = () => {
	const [posts, setPosts] = useState({} as IPosts);

	const fetchPosts = async () => {
		const res = await axios.get<IPosts>('http://localhost:4002/posts');

		setPosts(res.data);
	};

	useEffect(() => {
		void fetchPosts();
	}, []);

	const renderedPosts = Object.values(posts).map((post) => {
		return (
			<div
				className="card"
				style={{ width: '30%', marginBottom: '20px' }}
				key={post.id}
			>
				<div className="card-body">
					<h3>{post.title}</h3>
					<CommentList comments={post.comments} />
					<CommentCreate postId={post.id} />
				</div>
			</div>
		);
	});

	return (
		<div className="d-flex flex-row flex-wrap justify-content-between">
			{renderedPosts}
		</div>
	);
};

export default PostList;

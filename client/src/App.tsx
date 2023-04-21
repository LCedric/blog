import './App.css';
import PostCreate from './PostCreate';
import PostList from './PostList';

export const App = () => {
	return (
		<div className="container">
			<div>
				<h1>Create Post</h1>
				<PostCreate />
				<hr />
				<h1>Posts</h1>
				<PostList />
			</div>
		</div>
	);
};

import express from 'express';
import { randomBytes } from 'crypto';
import axios from 'axios';
import { IComment, ICommentByPostId } from './models/comment';

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {} as ICommentByPostId;

app.get('/posts/:id/comments', (req, res) => {
	res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
	const commentId = randomBytes(4).toString('hex');
	const { content } = req.body;
	const postId = req.params.id;

	const comments = commentsByPostId[postId] || [];

	const comment = { id: commentId, content, status: 'pending' };

	comments.push(comment);

	commentsByPostId[postId] = comments;

	await axios.post('http://localhost:4005/events', {
		type: 'CommentCreated',
		data: { ...comment, postId },
	});

	res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
	console.log('Received Event on port 4001', req.body.type);

	const { type, data } = req.body;
	if (type === 'CommentModerated') {
		const { postId, id, status } = data;

		const comments = commentsByPostId[postId];

		const comment =
			comments.find((comment) => comment.id === id) || ({} as IComment);

		comment.status = status;

		await axios.post('http://localhost:4005/events', {
			type: 'CommentUpdated',
			data: {
				postId,
				...comment,
			},
		});
	}

	res.send({});
});

app.listen(4001, () => {
	console.log('Comments listening on 4001');
});

import express from 'express';
import axios from 'axios';
import { IComment } from './models/comment';
import { IPosts } from './models/post';
import { IEvent, IEventData } from './models/event';

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {} as IPosts;

const handleEvent = (type: string, data: IEventData) => {
	if (type === 'PostCreated') {
		const { id, title } = data;

		posts[id] = { id, title, comments: [] };
	} else if (type === 'CommentCreated') {
		const { id, content, postId, status } = data;
		const post = posts[postId];

		post.comments.push({ id, content, status });
	} else if (type === 'CommentUpdated') {
		const { id, content, postId, status } = data;

		const post = posts[postId];
		const comment =
			post.comments.find((comment) => comment.id === id) || ({} as IComment);

		comment.status = status;
		comment.content = content;
	}
};

app.get('/posts', (_, res) => {
	res.send(posts);
});

app.post('/events', (req, res) => {
	const { type, data } = req.body;

	handleEvent(type, data);

	res.send({});
});

app.listen(4002, async () => {
	console.log('Query listening on 4002');

	const res = await axios.get<IEvent[]>('http://localhost:4005/events');

	console.log('i found ', res.data.length, ' events');

	for (let event of res.data) {
		console.log('Processing event: ', event.type);

		handleEvent(event.type, event.data);
	}
});

import express from 'express';
import axios from 'axios';
import { IEvent } from './models/event';

const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());

const events: IEvent[] = [];

app.post('/events', (req, res) => {
	const event = req.body;
	console.log(event);
	events.push(event);

	axios.post('http://localhost:4000/events', event).catch((_) => {});
	axios.post('http://localhost:4002/events', event).catch((_) => {});
	axios.post('http://localhost:4001/events', event).catch((_) => {});
	axios.post('http://localhost:4003/events', event).catch((_) => {});

	res.send({ status: 'OK' });
});

app.get('/events', (_, res) => {
	console.log('i send ', events.length, ' events');
	res.send(events);
});

app.listen(4005, () => {
	console.log('Events listening on 4005');
});

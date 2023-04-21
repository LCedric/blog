import { IPost } from './post';

export interface IEvent {
  type: string;
  data: IEventData;
}

export interface IEventData {
  id: string;
  content: IPost;
  postId: string;
  title: string;
  status: string;
}
